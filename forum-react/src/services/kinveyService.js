export default class KinveyService {
    getKinveyAppKey() {
        return 'kid_H1ZjN8iMx'
    }

    getKinveySecret() {
        return '44c440ddfad04876965ea158550e46c0'
    }


    getUserModuleUrl() {
        return `https://baas.kinvey.com/user/${this.getKinveyAppKey()}`
    }

    getCollectionModuleUrl(collection) {
        return `https://baas.kinvey.com/appdata/${this.getKinveyAppKey()}/${collection}`
    }
}
