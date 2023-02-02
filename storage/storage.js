import { Web3Storage } from 'web3.storage'

// const [formData, setformData] = useState({ username: "", title: "", post: "", time: "" });

function getAccessToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgyQTNDNzQ5MTMwRGE0MTE4NENhNjExNGZiODlGMzYwZkVlMGNCNTUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzQ5MjMwMzU4NDUsIm5hbWUiOiJjaGFpbkNhc3QifQ.vXJQnOBWq6bcVbiAQnyxmqzHx3P_B73L1EM0CgvKoO4';
    // return process.env.WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() })
}

async function storeFiles(files) {
    const client = makeStorageClient();
    const cid = await client.put(files);
    console.log('stored files with cid:', cid);
    return cid;
}

// const handleChange = (e, name) => {
//     const dt = new Date();
//     const time_str = `${dt.getHours()}:${dt.getMinutes()}  ${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`;
//     setformData((prevState) => ({
//         ...prevState,
//         time: time_str,
//         [name]: e.target.value
//     }));
// }

function makeFileObjects(formData) {

    const { username, title, post, time } = formData;

    const obj = {
        userName: username,
        title: title,
        post: post,
        time: time
    }
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })

    const files = [
        new File([blob], 'post-content.json'),
        // new File([imageObject], 'post-image.png', { type: "mime/image", })
    ]

    const post_cid = storeFiles(files);
    // retrieveFiles(post_cid);
    console.log("Cheers!")
}




// async function storeWithProgress(files) {
//     // show the root cid as soon as it's ready
//     const onRootCidReady = cid => {
//         console.log('uploading files with cid:', cid)
//     }

//     // when each chunk is stored, update the percentage complete and display
//     const totalSize = files.map(f => f.size).reduce((a, b) => a + b, 0)
//     let uploaded = 0

//     const onStoredChunk = size => {
//         uploaded += size
//         const pct = 100 * (uploaded / totalSize)
//         console.log(`Uploading... ${pct.toFixed(2)}% complete`)
//     }

//     // makeStorageClient returns an authorized web3.storage client instance
//     const client = makeStorageClient()

//     // client.put will invoke our callbacks during the upload
//     // and return the root cid when the upload completes
//     return client.put(files, { onRootCidReady, onStoredChunk })
// }

export {makeFileObjects};