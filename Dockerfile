# Usar una imagen base oficial de Rust
FROM rust:latest

# Crear un directorio de trabajo
WORKDIR /usr/src/myapp

# Copiar tu código fuente
COPY . .

# Compilar tu aplicación
RUN cargo build --release

# Ejecutar tu aplicación
CMD ["/usr/src/myapp/target/release/gh_release_sync"]
