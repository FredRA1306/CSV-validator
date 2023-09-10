import React from 'react';
import axiosInstance from '../axiosConfig'; 

function UpdateComponent({ products }) {
    const handleUpdate = async () => {
        const updatedProducts = products.map(product => {
            return {
                code: product.code,
                name: product.name,
                sales_price: parseFloat(product.new_price) 
            };
        });

        try {
            const response = await axiosInstance.post('/products/update', updatedProducts);
            alert(response.data.message);
        } catch (error) {
            console.error('Erro ao atualizar:', error);
            if (error.response) {
                console.log('Detalhes do erro:', error.response.data);
                alert(`Erro: ${error.response.data.message || 'Erro ao atualizar.'}`);
            } else {
                alert('Erro ao atualizar. Tente novamente.');
            }
        }
    };

    return (
        <div>
            <button onClick={handleUpdate}>ATUALIZAR</button>
        </div>
    );
}

export default UpdateComponent;
