import { Aperture } from 'lucide-react'
import { Link } from 'react-router-dom';


const Logo = () => {
  return (
    <Link to="/" className="flex flex-row gap-2 items-center">
      <Aperture className="w-8 h-8" color="#15959E" strokeWidth={1.5} />
      <span className="font-semibold text-lg text-primary">Urban Lens</span>
    </Link>
  );
}

export default Logo