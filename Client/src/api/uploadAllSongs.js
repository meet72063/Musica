export async function uploadImageAsPromise (imageFile) {
    return new Promise(function (resolve, reject) {
        var storageRef = firebase.storage().ref(fullDirectory+"/"+imageFile.name);
        var task = storageRef.put(imageFile);

        //Update progress bar
        task.on('state_changed',
            function progress(snapshot){
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 
                     100;
            },
            function error(err){
                console.log(err);
                reject(err);
            },
            function complete(){
                var downloadURL = task.snapshot.downloadURL;
                resolve(downloadURL);
            }
        );
    });
}