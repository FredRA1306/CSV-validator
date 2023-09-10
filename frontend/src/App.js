import React, { useState } from 'react';

import UploadComponent from './components/UploadComponent';
import ValidationComponent from './components/ValidationComponent';
import UpdateComponent from './components/UpdateComponent';
import FileValidationComponent from './components/FileValidationComponent';

function App() {
    const [validationResults, setValidationResults] = useState([]);
    const [updateAllowed, setUpdateAllowed] = useState(false);
    const [validatedProducts, setValidatedProducts] = useState([]);

    return (
        <div>
            <FileValidationComponent onValidationSuccess={setValidatedProducts}/>

            {/* Mostrando UpdateComponent se a atualização for permitida */}
            {validatedProducts.length > 0 && <UpdateComponent products={validatedProducts} />}
        </div>
    );
}

export default App;
