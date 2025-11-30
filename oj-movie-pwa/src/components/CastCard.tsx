interface CastCardProps {
  name: string;
  role: string;
  image: string;
}

const CastCard: React.FC<CastCardProps> = ({ name, role, image }) => {
  return (
    <div className="flex-shrink-0 w-32">
      <img
        src={image}
        alt={name}
        className="w-32 h-32 rounded-full object-cover mb-2"
      />
      <h3 className="text-sm font-medium">{name}</h3>
      <p className="text-xs text-gray-400">{role}</p>
    </div>
  );
};

export default CastCard;
