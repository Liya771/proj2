import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch all products
  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter based on search
  const filteredProducts = products.filter(
    (product) =>
      (product.title?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (product.description?.toLowerCase() || "").includes(search.toLowerCase())
  );

  // Mark a product as sold
  const markAsSold = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Get token
      if (!token) {
        alert("Please login again.");
        navigate("/login");
        return;
      }
      await axios.patch(
        `http://localhost:5000/api/products/${id}/sold`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token here
          },
        }
      );
      fetchProducts(); // Refresh list
    } catch (err) {
      console.error("Failed to mark as sold:", err);
      alert("Error: You might not be authorized.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Product Dashboard
      </h2>

      {/* Upload button */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => navigate("/upload")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + Upload Product
        </button>
      </div>

      {/* Search bar */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Search by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "80%",
            maxWidth: "400px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Product grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                width: "250px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
                position: "relative",
                opacity: product.sold ? 0.6 : 1,
              }}
            >
              {/* SOLD badge */}
              {product.sold && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "red",
                    color: "white",
                    padding: "4px 8px",
                    fontSize: "12px",
                    borderRadius: "5px",
                  }}
                >
                  SOLD
                </div>
              )}

              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <p>
                <strong>₹{product.price}</strong>
              </p>
              <p>Contact: {product.contact}</p>

              {/* Mark as Sold button */}
              {!product.sold && (
                <button
                  onClick={() => markAsSold(product.id)}
                  style={{
                    marginTop: "10px",
                    padding: "8px 12px",
                    background: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Mark as Sold
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
