import React from 'react'
import Style from './../style/FileUploadStyle.css'
import axios from 'axios'


export default class FileUpload extends React.Component{


    state = {
        file: null
    }

    handleChange = (e) => {
        console.log("FileUpload.handleChange e.target.files", e.target.files)

        this.setState({file: e.target.files[0]})
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        console.log("FileUpload.handleSubmit", this.state.file)

        const data = new FormData()
        data.append('files', this.state.file)


        // const response = await axios.post('http://localhost:1337/api/upload/', {
        //     body: data
        // })
        // console.log(response)
        // console.log(data)

        const upload_res = await axios({
            method: 'POST',
            url: 'http://localhost:1337/api/upload',
            data
        })
        console.log(upload_res.data[0].id)

        const fd = new FormData()
        fd.append('files', this.state.file);
        fd.append('ref', 'Image');
        fd.append('refId', data.id);
        fd.append('field', 'Image');
        fd.append('source', 'users-permissions')
        const uploadtotable_res = await axios({
            method: 'POST',
            url: 'http://localhost:1337/api/images',
            body: fd,

        })


        // console.log("FileUpload.handleSubmit upload_res", upload_res)

    }

    render(){
        return (
            <div className='FileUpload'>
                <form onSubmit={this.handleSubmit}>
                    <input type="file" onChange={this.handleChange}/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}