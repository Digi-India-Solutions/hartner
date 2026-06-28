function Footer() {
return (
    <footer className="bg-black text-white py-16">
    <div className="max-w-7xl mx-auto px-20 flex justify-between items-center">

        <div>
        <h2 className="text-2xl font-semibold">
            HARTNER IMMOBILIEN
        </h2>

        <p className="text-gray-400 mt-2">
            © 2026 Hartner Immobilien GmbH
        </p>
        </div>

        <div className="flex gap-10">
        <a href="#" className="hover:text-yellow-500">
            IMPRESSUM
        </a>

        <a href="#" className="hover:text-yellow-500">
            DATENSCHUTZ
        </a>
        </div>

        </div>
    </footer>
);
}

export default Footer;