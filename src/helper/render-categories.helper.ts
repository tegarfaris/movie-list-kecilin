export const renderCategoriesMovie = (category: number) => {
  let bgColor;
  let color;
  let text;

  switch (category) {
    case 28:
      bgColor = "bg-red-50";
      color = "text-red-500";
      text = "Action";
      break;
    case 12:
      bgColor = "bg-green-50";
      color = "text-green-500";
      text = "Adventure";
      break;
    case 16:
      bgColor = "bg-cyan-50";
      color = "text-cyan-500";
      text = "Animation";
      break;
    case 35:
      bgColor = "bg-yellow-50";
      color = "text-yellow-500";
      text = "Comedy";
      break;
    case 80:
      bgColor = "bg-purple-50";
      color = "text-purple-500";
      text = "Crime";
      break;
    case 99:
      bgColor = "bg-gray-50";
      color = "text-gray-500";
      text = "Documentary";
      break;
    case 18:
      bgColor = "bg-blue-50";
      color = "text-blue-500";
      text = "Drama";
      break;
    case 10751:
      bgColor = "bg-pink-50";
      color = "text-pink-500";
      text = "Family";
      break;
    case 14:
      bgColor = "bg-indigo-50";
      color = "text-indigo-500";
      text = "Fantasy";
      break;
    case 36:
      bgColor = "bg-orange-50";
      color = "text-orange-500";
      text = "History";
      break;
    case 27:
      bgColor = "bg-red-100";
      color = "text-red-700";
      text = "Horror";
      break;
    case 10402:
      bgColor = "bg-purple-100";
      color = "text-purple-700";
      text = "Music";
      break;
    case 9648:
      bgColor = "bg-teal-50";
      color = "text-teal-500";
      text = "Mystery";
      break;
    case 10749:
      bgColor = "bg-pink-100";
      color = "text-pink-700";
      text = "Romance";
      break;
    case 878:
      bgColor = "bg-gray-100";
      color = "text-gray-700";
      text = "Sci - Fi";
      break;
    case 10770:
      bgColor = "bg-green-100";
      color = "text-green-700";
      text = "TV Movie";
      break;
    case 53:
      bgColor = "bg-red-200";
      color = "text-red-800";
      text = "Thriller";
      break;
    case 10752:
      bgColor = "bg-gray-200";
      color = "text-gray-800";
      text = "War";
      break;
    case 37:
      bgColor = "bg-yellow-100";
      color = "text-yellow-700";
      text = "Western";
      break;
    default:
      return null;
  }

  return { bgColor, color, text };
};
