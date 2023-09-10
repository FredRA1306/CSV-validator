import React, { useState } from 'react';
import axiosInstance from '../axiosConfig'; 

function ValidationComponent({ validationResults, onValidationSuccess }) {
    const [validationErrors, setValidationErrors] = useState(validationResults || []);
    const [validatedProducts, setValidatedProducts] = useState([]);
    const [validationMessage, setValidationMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleValidation = async () => {
        setIsLoading(true);
        
        let productResponse; 
        
        try {
            productResponse = await axiosInstance.get('/products/validate');
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
            console.error("Erro durante a validação:", error);
            console.log("Detalhes do erro:", error.response ? error.response.data : 'Sem detalhes'); 
            if (error.response) {
                if (error.response.data.message) {
                    alert(`Erro: ${error.response.data.message}`);
                }
                if (error.response.data.errors && error.response.data.errors.length > 0) {
                    setValidationErrors(error.response.data.errors);
                }
            } else {
                alert('Erro durante a validação. Tente novamente.');
            }
        } finally {
            setIsLoading(false);
            const productsFromResponse = productResponse && productResponse.data.products || [];
            if (validationErrors.length === 0 && productsFromResponse.length > 0) {
                onValidationSuccess(productsFromResponse);
            }
        }
    };
    
    

    return (
        <div>
            <button onClick={handleValidation} disabled={isLoading}>VALIDAR</button>
            {isLoading && <p>Validando...</p>}
            
            {validationMessage && <p>{validationMessage}</p>}

            {Array.isArray(validationErrors) && validationErrors.length === 0 && !isLoading ? (
                <p>Tudo certo com o arquivo!</p>
            ) : (
                <ul>
                    {validationErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            )}

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

export default ValidationComponent;
