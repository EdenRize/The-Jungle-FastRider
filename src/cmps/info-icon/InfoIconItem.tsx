import { FC } from 'react';

export interface InfoIconItemProps {
  iconPath: string
  text: string
}

const InfoIconItem: FC<InfoIconItemProps> = ({iconPath, text}) => {
  return (
    <section className='info-icon-item'>

        <div className="icon-container">
            <img src={iconPath}/>
        </div>

        <p>{text}</p>
    </section>
  );
};

export default InfoIconItem;