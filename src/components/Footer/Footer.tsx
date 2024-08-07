export default function Footer() {
  return (
    <footer
      className="footer block-default block-default_shadowUp"
      aria-label="Site footer"
    >
      <h2>
        2024 | Made by{' '}
        <a
          className="link-accent"
          href="https://vk.com/id319692238"
          target="_blank"
          rel="noreferrer"
        >
          Andrey K.
        </a>{' '}
        | Powered by{' '}
        <a
          className="link-accent"
          href="https://www.igdb.com/api"
          target="_blank"
          rel="noreferrer"
        >
          IGDB API
        </a>{' '}
        | Hosted by{' '}
        <a
          className="link-accent"
          href="https://www.netlify.com/"
          target="_blank"
          rel="noreferrer"
        >
          Netlify
        </a>
      </h2>
    </footer>
  );
}
