import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>🛍️ ShoppyGlobe</h1>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/login" style={styles.link}>
          Login
        </Link>
        <Link to="/register" style={styles.link}>
          Register
        </Link>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#333',
    color: '#fff',
  },
  logo: {
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '1rem',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};