function Footer() {
    return <footer className="page-footer green lighten-4">
        <div className="footer-copyright">
            <div className="container">
                © {new Date().getFullYear()} Copyright Text
                <a className="grey-text text-lighten-4 right"
                   href='https://sashkovna.github.io/react-shop/'
                   target='_blank'
                   rel='noreferrer'
                >Repo</a>
            </div>
        </div>
    </footer>
}

export {Footer}