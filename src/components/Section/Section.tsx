import { useState } from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';

export default function Section() {
  const [active, setActive] = useState(false);
  const activeClass = active ? 'section_collapsed' : '';

  return (
    <section
      className={`section ${activeClass} block-default block-default_shadowDown`}
    >
      <SectionHeader
        title="Most Popular"
        active={active}
        setActive={setActive}
      />
      <div className="section-content">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quod
          magnam quas placeat tempore maiores mollitia optio fuga ipsum quidem,
          veritatis ratione animi quae recusandae nesciunt laudantium molestiae
          tenetur provident!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quod
          magnam quas placeat tempore maiores mollitia optio fuga ipsum quidem,
          veritatis ratione animi quae recusandae nesciunt laudantium molestiae
          tenetur provident!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quod
          magnam quas placeat tempore maiores mollitia optio fuga ipsum quidem,
          veritatis ratione animi quae recusandae nesciunt laudantium molestiae
          tenetur provident!
        </p>
      </div>
    </section>
  );
}
