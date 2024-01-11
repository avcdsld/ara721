import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Container from 'components/Container';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import useWindowSize from 'hooks/useWindowSize';

export default function TheNFT() {
  const { t } = useTranslation();
  const [width] = useWindowSize();

  const cadenceCode1 = `pub resource NFT: NonFungibleToken.INFT, MetadataViews.Resolver {
    pub let id: UInt64

    init(id: UInt64) {
        self.id = id
    }

    pub fun whatAreYou(): String {
        return self.id.toString()
    }
    :       
}`;

  const cadenceCode2 = `    pub fun getViews(): [Type] {
        return [
            Type<MetadataViews.Display>(),
            Type<TextPlain>(),
            Type<TextHtml>(),
            Type<ImageSvg>()
        ]
    }

    pub fun resolveView(_ view: Type): AnyStruct? {
        switch view {
            case Type<MetadataViews.Display>():
                return MetadataViews.Display(
                    name: "#".concat(self.id.toString()),
                    description: "The NFT",
                    thumbnail: MetadataViews.HTTPFile(url: TheNFT.baseUrl.concat(self.id.toString())),
                )
            case Type<TextPlain>():
                return TextPlain(id: self.id).data()
            case Type<TextHtml>():
                return TextHtml(id: self.id).data()
            case Type<ImageSvg>():
                return ImageSvg(id: self.id).data()
        }
        return nil
    }`;

  const solidityCode1 = `import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TheNFT is ERC721, Ownable {
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "not exists");
        return string.concat(
            'data:application/json;utf8,',
            '{',
            '"name":"#', Strings.toString(tokenId), '",',
            '"description":"The NFT",',
            '"image":"', baseUrl, Strings.toString(tokenId), '"',
            '}'
        );
    }
    :
}`;

  const solidityCode2 = `function dataTextPlain(uint256 tokenId) public pure returns (string memory) {
    return string.concat(
        'data:text/plain,%23',
        Strings.toString(tokenId)
    );
}

function dataTextHtml(uint256 tokenId) public pure returns (string memory) {
    return string.concat(
        'data:text/html,%3C%21DOCTYPE%20html%3E%3Chtml%3E%3Cdiv%20style%3D%22display%3A%20flex%3B%20justify-content%3A%20center%3B%20align-items%3A%20center%3B%20height%3A%20100vh%3B%22%3E%3Ch1%3E%23',
        Strings.toString(tokenId),
        '%3C%2Fh1%3E%3C%2Fdiv%3E%3C%2Fhtml%3E'
    );
}

function dataImageSvg(uint256 tokenId) public pure returns (string memory) {
    return string.concat(
        'data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%0D%0A%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22%23000000%22%20%2F%3E%0D%0A%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22central%22%20fill%3D%22%23ffffff%22%3E%0D%0A%23',
        Strings.toString(tokenId),
        '%0D%0A%3C%2Ftext%3E%3C%2Fsvg%3E%0D%0A'
    );
}`;

  return (
    <Container title="The NFT – ara721.art">
      <div className="justify-center max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          The NFT
        </h1>
        <h2 className="font-bold text-2xl md:text-3xl tracking-tight mb-4 text-black dark:text-white">
          {t('theNft.subTitle')}
        </h2>
        <h3 className="mb-4 text-black dark:text-white">
          {t('theNft.workInfo')}
        </h3>
        <Image
          alt="The NFT"
          height={400}
          width={600}
          src="/static/images/the-nft.png"
          className="mt-4 mb-8"
        />
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {t('theNft.abstract')}
        </p>

        <div className="mb-8 prose dark:prose-dark leading-6">
          <h3>{t('theNft.whatIsNFT')}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('theNft.whatIsNFTDescription')}
          </p>

          <h3>{t('theNft.objectLikeExpression')}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('theNft.objectLikeExpressionDescription1')}
          </p>

          {width && (
            <SyntaxHighlighter
              language={'plaintext'}
              style={a11yDark}
              // showLineNumbers
              layout="responsive"
              customStyle={{
                maxWidth: width - 60
              }}
            >
              {cadenceCode1}
            </SyntaxHighlighter>
          )}

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('theNft.objectLikeExpressionDescription2')}
          </p>

          {width && (
            <SyntaxHighlighter
              language={'plaintext'}
              style={a11yDark}
              // showLineNumbers
              layout="responsive"
              customStyle={{
                maxWidth: width - 60
              }}
            >
              {cadenceCode2}
            </SyntaxHighlighter>
          )}

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('theNft.objectLikeExpressionDescription3')}
          </p>

          <h4>text/plain</h4>
          <iframe srcDoc="#1"></iframe>

          <h4>text/html</h4>
          <iframe height="300px" srcDoc='<div style="display: flex; justify-content: center; align-items: center; height: 100vh;"><h1>#1</h1></div>'></iframe>

          <h4>image/svg</h4>
          <Image
            alt="Protein"
            height={300}
            width={300}
            src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%0D%0A%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22%23000000%22%20%2F%3E%0D%0A%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22central%22%20fill%3D%22%23ffffff%22%3E%0D%0A%231%0D%0A%3C%2Ftext%3E%3C%2Fsvg%3E%0D%0A"
            className="mt-4 mb-8"
            priority
            style={{ border: 'solid 1px #777777' }}
          />
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('theNft.objectLikeExpressionDescription4')}
          </p>

          <h3>{t('theNft.conceptualExpression')}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('theNft.conceptualExpressionDescription1')}
          </p>

          {width && (
            <SyntaxHighlighter
              language={'plaintext'}
              style={a11yDark}
              // showLineNumbers
              layout="responsive"
              customStyle={{
                maxWidth: width - 60
              }}
            >
              {solidityCode1}
            </SyntaxHighlighter>
          )}

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('theNft.conceptualExpressionDescription2')}
          </p>

          {width && (
            <SyntaxHighlighter
              language={'plaintext'}
              style={a11yDark}
              // showLineNumbers
              layout="responsive"
              customStyle={{
                maxWidth: width - 60
              }}
            >
              {solidityCode2}
            </SyntaxHighlighter>
          )}

          <hr />

          <h3>{t('theNft.links')}</h3>
          <ul className="text-gray-600 dark:text-gray-400 mb-8">
            <li>
              {t('theNft.flowdiverDescription')}
              <ul>
                <li>
                  <a
                    target="_blank"
                    href="https://www.flowdiver.io/contract/A.fe437b573d368d6a.TheNFT?tab=deployments"
                    rel="noreferrer"
                  >
                    Flow Diver
                  </a>
                </li>
              </ul>
            </li>
            <li>
              {t('theNft.etherscanDescription')}
                <ul>
                  <li>
                    <a
                      target="_blank"
                      href="https://etherscan.io/address/0x5524162b9e408483647dfaa88c8468b66c493488#code"
                      rel="noreferrer"
                    >
                      Etherscan
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://opensea.io/ja/collection/the-nft-ethereum"
                      rel="noreferrer"
                    >
                      OpenSea
                    </a>
                  </li>
                </ul>
              </li>
            <li>
              {t('theNft.githubDescription')}
              <ul>
                <li>
                  <a
                  target="_blank"
                  href="https://github.com/avcdsld/code-as-art/tree/main/the-nft"
                  rel="noreferrer"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
