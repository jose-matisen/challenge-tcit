import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost, deletePost } from "../redux/postsSlice";
import "./inicio.css";

const Inicio = () => {
  const dispatch = useDispatch();
  const { items: posts } = useSelector((state) => state.posts);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [filtroTexto, setFiltroTexto] = useState("");
  const [postsFiltrados, setPostsFiltrados] = useState([]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    // Actualiza los posts filtrados cuando llegan los posts
    setPostsFiltrados(posts);
  }, [posts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() === "" || descripcion.trim() === "") {
      alert("Por favor completa todos los campos");
      return;
    }

    dispatch(
      addPost({ nombre: nombre.trim(), descripcion: descripcion.trim() })
    );
    setNombre("");
    setDescripcion("");
  };

  const handleEliminar = (id) => {
    dispatch(deletePost(id));
  };

  const handleBuscar = () => {
    const texto = filtroTexto.trim().toLowerCase();

    if (texto === "") {
      setPostsFiltrados(posts); // mostrar todo
    } else {
      const filtrados = posts.filter((post) =>
        post.nombre.toLowerCase().includes(texto)
      );
      setPostsFiltrados(filtrados);
    }
  };

  return (
    <main className="container">
      <div className="justify-content-between w-80">
        <div>
          <input
            type="text"
            placeholder="Filtro de Nombre"
            className="input"
            value={filtroTexto}
            onChange={(e) => setFiltroTexto(e.target.value)}
          />
        </div>
        <button className="button" onClick={handleBuscar}>
          Buscar
        </button>
      </div>

      <div className="w-80">
        <table className="table mt-30">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {postsFiltrados.length !== 0 ? (
              postsFiltrados.map((post) => (
                <tr key={post.id}>
                  <td>{post.nombre}</td>
                  <td>{post.descripcion}</td>
                  <td>
                    <button
                      className="button"
                      onClick={() => handleEliminar(post.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center">
                  No hay datos agregados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="w-50 mt-30">
        <form className="justify-content-between" onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Nombre"
            id="nombre"
            autoComplete="off"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            className="input"
            placeholder="Descripción"
            id="descripcion"
            autoComplete="off"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <button type="submit" className="button" id="btnCrear">
            Crear
          </button>
        </form>
      </div>
    </main>
  );
};

export default Inicio;
