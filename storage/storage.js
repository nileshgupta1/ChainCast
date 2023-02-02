import { Web3Storage } from 'web3.storage'
import posts from '../client/src/utils/posts'
import { retrieve } from './retrieve';

const [formData, setformData] = useState({ imageObject: "", text: "", title: "", username: "", time: "" });

function getAccessToken() {
    return process.env.WEB3STORAGE_TOKEN
}

function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() })
}

async function storeFiles(files) {
    const client = makeStorageClient()
    const cid = await client.put(files)
    console.log('stored files with cid:', cid)
    return cid
}

{/* <input name="username" type="text" handleChange={handleChange} />
<input name="title" type="number" handleChange={handleChange} />
<input  name="text" type="text" handleChange={handleChange} /> 
<input name="imageObject" type="file" handleChange={handleChange} /> */}
const handleChange = (e, name) => {
    const dt = new Date();
    const time_str = `${dt.getHours()}:${dt.getMinutes()}  ${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`;
    setformData((prevState) => ({
        ...prevState,
        time: time_str,
        [name]: e.target.value
    }));
}

function makeFileObjects() {

    const { imageObject, text, title, username, time } = formData;

    const obj = {
        text: text,
        title: title,
        username: username,
        time: time
    }
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })

    const files = [
        new File([blob], 'post-content.json'),
        new File([imageObject], 'post-image.png', { type: "mime/image", })
    ]

    const post_cid = storeFiles(files);
    retrieveFiles(post_cid);
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