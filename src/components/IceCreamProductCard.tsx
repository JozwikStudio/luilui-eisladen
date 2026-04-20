interface IceCreamProductCardProps {
  name: string;
  description: string;
  image: string;
  badge?: string;
}

export default function IceCreamProductCard({ name, description, image, badge }: IceCreamProductCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-luilui-sm hover:shadow-luilui-md hover:-translate-y-1 transition-all duration-300 group">
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-inter text-base font-semibold text-luilui-dark-text">{name}</h4>
          {badge && (
            <span className="flex-shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-luilui-ice-mint text-luilui-primary">
              {badge}
            </span>
          )}
        </div>
        <p className="text-sm text-luilui-muted-text line-clamp-2">{description}</p>
      </div>
    </div>
  );
}
