export const BoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "80vw",
  gap: 2,
  marginBottom: 4,
};

export const RandomBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 4,
  width: "40vw",
};

export const HeaderBox = {
  padding: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const HomeBox = {
  padding: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const HeaderContainer = {
  display: "flex",
  gap: 4,
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 4,
  width: "77vw",
};

export const LinkFavorites = {
  underline: "none",
  color: "black",
  fontSize: 26,
};

export const ProductListStack = {
  justifyContent: "center",
  display: "flex",
  marginBottom: 4,
  flexDirection: "row",
  spacing: 2,
  flexWrap: "wrap",
  gap: 8,
};

export const ProductCardBox = {
  width: { xs: "100%", sm: "48%", md: "30%", lg: "22%" },
  p: 1,
  boxSizing: "border-box",
  maxWidth: "300px",
  flex: "1 1 auto",
};

export const ProductCardLink = {
  textDecoration: "none",
  color: "inherit",
  display: "block",
};
export const ProductCardMedia = {
  width: "100%",
  height: { xs: "200px", sm: "250px", md: "270px" },
  objectFit: "cover",
};
export const ProductCardContent = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export const ModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ButtonStyle = {
  mt: 2,
  position: "absolute",
  right: "15px",
  top: 0,
};

export const ImageStyle = {
  width: "200px",
  borderRadius: "8px",
  marginBottom: "8px",
};

export const DetailBoxStyle = {
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  alignItems: "center",
  justifyContent: "center",
  padding: 2,
  gap: 2,
  height: "100vh",
};

export const CardStyle = {
  width: { xs: "100%", md: "50%" },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: 3,
};

export const FavoritesContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const FavoritesListStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: 5,
  width: "80vw",
};
