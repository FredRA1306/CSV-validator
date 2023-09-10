import React, { useState } from "react";
import axiosInstance from "../axiosConfig";

function FileValidationComponent({ onValidationSuccess, onFileChange }) {
  const [file, setFile] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [validatedProducts, setValidatedProducts] = useState([]);
  const [validationMessage, setValidationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetStates = () => {
    setValidationErrors([]);
    setValidatedProducts([]);
    setValidationMessage("");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    resetStates();

    // Quando um novo arquivo é selecionado, notificamos o App.js para resetar os produtos validados.
    if (typeof onFileChange === "function") {
      onFileChange();
    }
  };

  const handleFileValidation = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    let productResponse;

    try {
      await axiosInstance.post("/products/upload", formData);
      productResponse = await axiosInstance.get("/products/validate");

      setValidationMessage(productResponse.data.message || "");
      setValidationErrors(productResponse.data.errors || []);
      setValidatedProducts(productResponse.data.products || []);

      if (productResponse.data.success) {
        const packResponse = await axiosInstance.get("/packs/validate");
        if (!packResponse.data.success) {
          setValidationErrors((prevErrors) => [
            ...prevErrors,
            ...packResponse.data.errors,
          ]);
        }
      }

      const errorsFromResponse =
        (productResponse && productResponse.data.errors) || [];
      const productsFromResponse =
        (productResponse && productResponse.data.products) || [];

      if (errorsFromResponse.length === 0 && productsFromResponse.length > 0) {
        onValidationSuccess(productsFromResponse);
      }
    } catch (error) {
      console.error("Erro durante o upload/validação:", error);
      if (error.response) {
        if (
          error.response.data.errors &&
          error.response.data.errors.length > 0
        ) {
          setValidationErrors(error.response.data.errors);
        }
      } else {
        alert("Erro ao enviar o arquivo.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileValidation} disabled={!file || isLoading}>
        {isLoading ? "Validando..." : "Validar"}
      </button>

      {validationMessage && <p>{validationMessage}</p>}

      {Array.isArray(validationErrors) && validationErrors.length > 0 && (
        <ul>
          {validationErrors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}

      {validatedProducts.length > 0 && !isLoading && (
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
