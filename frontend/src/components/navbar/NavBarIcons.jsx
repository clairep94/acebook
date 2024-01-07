import React from 'react';

export default function NavbarIcons({ icon, isCurrentPage, index }) {
  const label = `${icon.name} icon`;

  const allIcons = `
    flex items-center justify-center
    h-[3.5rem] w-[4.5rem] rounded-lg text-[${icon.size}] mr-2 relative
  `;

  const notOnPage = 'text-[#a8b5c8] hover:bg-gray-100 ';
  const onPage = 'text-[#4d76b2] ';
  
  const hoverLabel = `
    hidden group-hover:flex absolute text-[12px] font-light bg-black/60 text-white p-2 rounded-md 
    translate-y-2 items-center justify-center w-11/12 
  `;

  const currentPageLine = `
    absolute -bottom-[0.3rem] w-[4.5rem] bg-[#4d76b2] h-[2px]
  `;

  const notificationDot = `
    absolute top-4 right-[1.8rem] w-[0.7rem] h-[0.7rem] bg-red-500 rounded-full
  `;

  return (
    <div key={index} aria-label={label} id={label} className='group relative'>
      {isCurrentPage ? (
        <>
          <button className={allIcons + onPage} onClick={icon.handleClick}>
            {icon.icon}
          </button>
          <div className={currentPageLine}/>
        </>
      ) : (
        <button className={allIcons + notOnPage} onClick={icon.handleClick}>
          {icon.icon}
        </button>
      )}
      {icon.notifications && <div className={notificationDot}/>}
      <div className={hoverLabel}>
        {icon.name}
      </div>
    </div>
  );
}
