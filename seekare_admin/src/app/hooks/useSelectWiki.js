import { useSelector } from 'react-redux';

const useSelectWiki = () => {
  const wikiById = useSelector((state) => state.wiki.wikiById);
  return wikiById || null;
};

export { useSelectWiki };
