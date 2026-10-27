import Link from 'next/link'
export default function NotFound() { return <main className="shell not-found"><Link className="brand" href="/">zapata<span>.</span></Link><h1>Ese producto no está aquí.</h1><p>Explora los modelos que sí tenemos en el catálogo.</p><Link className="text-link" href="/#catalogo">Volver al catálogo →</Link></main> }
