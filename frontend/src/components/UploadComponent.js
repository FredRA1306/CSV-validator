import React, { useState } from 'react';
import axiosInstance from '../axiosConfig'; 

function UploadComponent() {
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axiosInstance.post("/products/upload", formData); 
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao enviar o arquivo:", error);
            if (error.response) {
                alert(`Erro: ${error.response.data.message}`);
            } else {
                alert('Erro ao enviar o arquivo.');
            }
        }
    };

    return (
        <div>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default UploadComponent;
