type CardProps = {
  title: string;
  sub: {
    title: string;
    isCompleted: boolean;
  }[];
};

const MainCard = ({ title, sub }: CardProps) => {
  const count = sub.filter((item) => item.isCompleted === true).length;
  return (
    <div className="flex flex-col [&_p]:word-break h-fit p-[1.5rem_1rem] rounded-[8px] shadow-[0_4px_6px_#364e7e1a] mb-[1.5rem] bg-mainDark min-h-[5.5rem] w-full transition-[filter_.2s_ease] cursor-grab">
      <p className="font-[700] text-[.9375rem]">{title}</p>
      <p className="font-[700] text-[.75rem] text-[#828fa3]">
        {count} of {sub.length}
      </p>
    </div>
  );
};

export default MainCard;
