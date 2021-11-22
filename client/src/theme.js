// xs={20} md={20} lg={5} xl={5}
const size = {
	xs: "576px",
	md: "768px",
	lg: "992px",
	xl: "1200px",
}

const theme = {
	xs: `(max-width: ${size.xs})`,
	md: `(max-width: ${size.md})`,
	lg: `(max-width: ${size.lg})`,
	xl: `(max-width: ${size.xl})`,
}

export default theme
