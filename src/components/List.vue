<template>
    <div class="list">
        <md-progress-bar md-mode="indeterminate" v-if="loading"></md-progress-bar>
        
        <md-autocomplete 
            v-model="search" :md-options="autocomplete" md-layout="box" md-dense
            @md-changed="syncRoute" style="position:sticky;top:72px">
            <label>Search for "{{ autocomplete[Math.floor(Math.random() * autocomplete.length)] }}" in {{ objects.length }} objects</label>
            <template slot="md-autocomplete-empty" slot-scope="{ term }">
                No object matching "{{ term }}" were found. <a @click="add()">Create a new</a> one
            </template>
        </md-autocomplete>

        <md-list v-if="objects" :md-expand-single="true">
            <div v-for="(item, index) in objects" v-bind:key="index">
                <md-list-item v-if="search === '' || item.name.includes(search)" md-expand>
                    <span class="md-list-item-text" v-if="!item.unavailable">{{ item.name }}</span>
                    <span class="md-list-item-text" v-else><strike>{{ item.name }}</strike></span>

                    <md-list slot="md-expand">
                        <md-list-item>
                            <md-icon>schedule</md-icon>
                            <span class="md-list-item-text">
                                {{ item.updatedAt 
                                ? 'Updated on ' + item.updatedAt.toDate().toDateString() 
                                : 'Created on ' + item.createdAt.toDate().toDateString() }}
                            </span>
                        </md-list-item>
                        <md-list-item>
                            <md-icon>folder</md-icon>
                            <span class="md-list-item-text">\{{ item.path }}</span>
                        </md-list-item>
                        <a :href="item.link" :title="item.link" target="_blank">
                            <md-list-item>
                                <md-icon>launch</md-icon>
                                <span class="md-list-item-text">{{ item.link }}</span>
                            </md-list-item>
                        </a>
                        <md-list-item>
                            <md-button @click="currentEdit = item.id">Edit <md-icon>edit</md-icon></md-button>
                        </md-list-item>
                        <md-dialog :md-click-outside-to-close="false" :md-active.sync="currentEdit === item.id">
                            <md-dialog-title>Edit {{ item.name }}</md-dialog-title>
                            <md-dialog-content>
                                <edit-form :data="item" ref="edit"></edit-form>
                            </md-dialog-content>
                            <md-dialog-actions>
                                <md-button class="md-primary" @click="currentEdit = ''">cancel</md-button>
                            </md-dialog-actions>
                        </md-dialog>
                    </md-list>
                </md-list-item>
            </div>
        </md-list>

    </div>
</template>

<script>
import {firebase} from '../firebaseConfig'
const collection = firebase.firestore().collection('objects')

export default {
    components: {
        editForm: () => import('./Form')
    },
    data() {
        return {
            objects: null,
            autocomplete: [],
            loading: false,
            currentEdit: '',
            hasItems: 0,
            search: '',
            mode: 'search'
        }
    },
    created() {
        collection.onSnapshot(snapshot => {
            this.objects = []
            this.autocomplete = []
            this.loading = true
            snapshot.docs.map(doc => {
                let buffer = doc.data()
                buffer.id = doc.id
                this.objects.push(buffer)
                this.autocomplete.push(doc.data().name)
            })
            this.loading = false
        }, err => {
            this.loading = false
            alert(err)
        })
        if(this.$route.params.string) {
            this.search = this.$route.params.string
        }
    },
    methods: {
        syncRoute() {
            this.$router.push('/' + this.search)
        },
        add() {

        }
    }
}
</script>