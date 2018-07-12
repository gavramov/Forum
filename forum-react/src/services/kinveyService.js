export default class KinveyService {
    getKinveyAppKey() {
        // return 'kid_ryea9AW7Q'
        return 'kid_H1ZjN8iMx'
    }

    getKinveySecret() {
        // return '6567e091a2e54114be97c879a0fa4c7d'
        return '44c440ddfad04876965ea158550e46c0'
    }


    getUserModuleUrl() {
        return `https://baas.kinvey.com/user/${this.getKinveyAppKey()}`
    }

    getCollectionModuleUrl(collection) {
        return `https://baas.kinvey.com/appdata/${this.getKinveyAppKey()}/${collection}`
    }

    getUploadAvatarUrl() {
        return `https://baas.kinvey.com/blob/${this.getKinveyAppKey()}`
    }
}
