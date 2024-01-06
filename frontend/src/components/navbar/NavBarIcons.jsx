import React from 'react';

export default function NavbarIcons({ icon, isCurrentPage, index }) {
  const label = `${icon.name} icon`;

  const allIcons = `
    flex items-center justify-center
    h-[3.5rem] w-[4.5rem] rounded-lg text-[${icon.size}] mr-2 
  `;

  const notOnPage = 'text-#iconGrey hover:bg-gray-100 ';
  const onPage = 'text-#iconBlue ';
  
  const hoverLabel = `
    hidden group-hover:flex absolute text-[12px] font-light bg-black/60 text-white p-2 rounded-md 
    translate-y-2 items-center justify-center w-11/12 
  `;

  const currentPageLine = `
    absolute -bottom-[0.3rem] w-[4.5rem] bg-#iconBlue h-[2px]
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
      <div className={hoverLabel}>
        {icon.name}
      </div>
    </div>
  );
}
