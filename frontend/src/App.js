import React, { useState } from "react";
import FileValidationComponent from "./components/FileValidationComponent";
import UpdateComponent from "./components/UpdateComponent";

function App() {
  const [validatedProducts, setValidatedProducts] = useState([]);

  return (
    <div>
      <FileValidationComponent
        onValidationSuccess={setValidatedProducts}
        onFileChange={() => setValidatedProducts([])} // Resetar o array de produtos validados
      />

      {/* Renderiza o UpdateComponent se existirem produtos validados */}
      {validatedProducts.length > 0 && (
        <UpdateComponent products={validatedProducts} />
      )}
    </div>
  );
}

export default App;
