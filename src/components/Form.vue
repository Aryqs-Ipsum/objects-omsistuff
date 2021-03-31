<template>
    <form>
        <md-field>
            <label for="name">Object name</label>
            <md-input type=text id="name" v-model="object.name" :disabled="sending" required/>
        </md-field>

        <md-field>
            <label for="path">Folder name</label>
            <md-input type=text id="path" v-model="object.path" :disabled="sending || data" required/>
            <span class="md-helper-text">Name of object folder in OMSI 2, eg : "Verkehrszeichen_MC"</span>
        </md-field>

        <md-field>
            <label for="link">Link</label>
            <md-input type=url id="link" v-model="object.link" :disabled="sending" required/>
            <span class="md-helper-text">Must be a valid https link</span>
        </md-field>

        <md-switch v-if="object.id" v-model="object.unavailable">Link broken ?</md-switch>

        <md-button @click="submit" :disabled="sending">
            {{ object.id ? 'Save' : 'Submit' }}
            <md-progress-spinner v-if="sending" :md-diameter="16" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        </md-button>

        <md-snackbar md-position="center" :md-duration="3000" :md-active.sync="sended" md-persistent>
            <span>{{ object.id ? 'Data successfully saved !' : 'Object added !' }}</span>
        </md-snackbar>
    </form>
</template>

<script>
import {firebase} from '../firebaseConfig'
const collection = firebase.firestore().collection('objects')

export default {
    props: [
        'data'
    ],
    data() {
        return {
            object: {},
            sending: false,
            sended: false,
        }
    },
    methods: {
        submit() {
            this.sending = true
            if(!this.object.id) {
                this.object.createdAt = firebase.firestore.FieldValue.serverTimestamp()
                this.object.unavailable = false
            } else {
                this.object.updatedAt = firebase.firestore.FieldValue.serverTimestamp()
            }
            collection.doc(this.object.id).set(this.object)
            .then(() => {
                this.sending = false
                this.sended = true
                if(!this.object.id) {
                    this.object = {}
                }
            })
            .catch(err => {
                this.sending = false
                alert(err)
            })
        }
    },
    created() {
        if(this.data) {
            this.object = this.data
        }
    }
}
</script>