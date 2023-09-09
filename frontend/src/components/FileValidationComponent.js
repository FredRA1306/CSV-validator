import React, { useState } from 'react';
import axiosInstance from '../axiosConfig'; // Importe a instância

function FileValidationComponent({ onValidationSuccess }) {
    const [file, setFile] = useState(null);
    const [validationErrors, setValidationErrors] = useState([]);
    const [validatedProducts, setValidatedProducts] = useState([]);
    const [validationMessage, setValidationMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFileValidation = async () => {
        setIsLoading(true);

        // Primeiro, fazemos o upload do arquivo.
        const formData = new FormData();
        formData.append('file', file);
        
        let productResponse; 

        try {
            await axiosInstance.post("/products/upload", formData);
            
            // Se o upload for bem-sucedido, então fazemos a validação.
            let productResponse = await axiosInstance.get('/products/validate');
            
            setValidationMessage(productResponse.data.message || '');
            setValidationErrors(productResponse.data.errors || []);
            setValidatedProducts(productResponse.data.products || []);
            
            if (productResponse.data.success) {
                const packResponse = await axiosInstance.get('/packs/validate');
                if (!packResponse.data.success) {
                    setValidationErrors(prevErrors => [...prevErrors, ...packResponse.data.errors]);
                }
            }

        } catch (error) {
            console.error("Erro durante o upload/validação:", error);
            if (error.response) {
                if (error.response.data.errors && error.response.data.errors.length > 0) {
                    setValidationErrors(error.response.data.errors);
                }
            } else {
                alert('Erro ao enviar o arquivo.');
            }
        } finally {
            setIsLoading(false);
            const errorsFromResponse = productResponse && productResponse.data.errors || [];
            if (errorsFromResponse.length === 0 && validatedProducts.length > 0) {
                onValidationSuccess(validatedProducts);
            }
        }
    };

    return (
        <div>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleFileValidation} disabled={!file || isLoading}>
                {isLoading ? "Validando..." : "Validar"}
            </button>

            {validationMessage && <p>{validationMessage}</p>}

            {
                Array.isArray(validationErrors) && validationErrors.length > 0 && (
                    <ul>
                        {validationErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                )
            }


            {validatedProducts.length > 0 && !isLoading &&(
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Preço Atual</th>
                            <th>Novo Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {validatedProducts.map((product) => (
                            <tr key={product.code}>
                                <td>{product.code}</td>
                                <td>{product.name}</td>
                                <td>{product.current_price}</td>
                                <td>{product.new_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default FileValidationComponent;
