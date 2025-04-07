
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-optimove-text-light">
              © 2025 OptiMove - Jaipur Region
            </p>
          </div>
          <div className="flex space-x-4">
            <Link to="/help" className="text-sm text-optimove-text-light hover:text-optimove-primary">
              Help
            </Link>
            <Link to="/privacy" className="text-sm text-optimove-text-light hover:text-optimove-primary">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm text-optimove-text-light hover:text-optimove-primary">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
