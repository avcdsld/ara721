import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Container from 'components/Container';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { swift } from 'react-syntax-highlighter/dist/cjs/languages/prism';
import { synthwave84 } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import useWindowSize from 'hooks/useWindowSize';

SyntaxHighlighter.registerLanguage('swift', swift);

export default function Mutation() {
  const { t } = useTranslation();
  const [width] = useWindowSize();

  const code = `pub contract Mutation {
    priv var name: String
    priv var mutatedName: String
    pub var mutatedCode: [UInt8]

    init() {
        self.name = "Mutation"
        self.mutatedName = ""
        self.mutatedCode = []
    }

    pub fun mutate() {
        let point = Int(getCurrentBlock().id[0] % UInt8(self.name.length))
        var mutatedName = ""
        var i = 0
        while i < self.name.length {
            if i == point {
                mutatedName = mutatedName.concat("X")
            } else {           
                mutatedName = mutatedName.concat(self.name[i].toString())
            }
            i = i + 1
        }
        self.mutatedName = mutatedName

        let codeStr = String.encodeHex(self.account.contracts.get(name: self.name)!.code)
        var mutatedCodeHex = String.encodeHex("pub contract ".concat(mutatedName).utf8)
        mutatedCodeHex = mutatedCodeHex.concat(codeStr.slice(from: mutatedCodeHex.length, upTo: codeStr.length))
        self.mutatedCode = mutatedCodeHex.decodeHex()
    }

    pub fun replicate(account: AuthAccount) {
        account.contracts.add(name: self.mutatedName, code: self.mutatedCode)
    }
}`;

  return (
    <Container title="Mutation – ara721.art">
      <div className="justify-center max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Mutation
        </h1>
        <h3 className="mb-4 text-black dark:text-white">
          {t('mutation.workInfo')}
        </h3>
        <Image
          alt="Protein"
          height={400}
          width={600}
          src="/static/images/mutation.png"
          className="mt-4 mb-8"
        />
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {t('mutation.abstract')}
        </p>

        <div className="mb-8 prose dark:prose-dark leading-6">
          <h3>{t('mutation.meaning')}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('mutation.meaningDescription')}
          </p>

          <h3>{t('mutation.codeDescription')}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('mutation.codeDescriptionDescription')}
          </p>

          {width && (
            <SyntaxHighlighter
              language={'swift'}
              style={synthwave84}
              showLineNumbers
              layout="responsive"
              customStyle={{
                maxWidth: width - 60
              }}
            >
              {code}
            </SyntaxHighlighter>
          )}

          <hr />

          <h3>{t('mutation.links')}</h3>
          <ul className="text-gray-600 dark:text-gray-400 mb-8">
            <li>
              <a
                target="_blank"
                href="https://flowscan.org/contract/A.fe437b573d368d6a.Mutation"
                rel="noreferrer"
              >
                Flowscan (Contract)
              </a>
              <ul>
                <li>{t('mutation.flowscanDescription1')}</li>
              </ul>
            </li>
            <li>
              <a
                target="_blank"
                href="https://flowscan.org/transaction/27e69b0f2cd8472f697337ebd85d846dbf9502c540188b8304e610efb09b4661/script"
                rel="noreferrer"
              >
                Flowscan (Transaction)
              </a>
              <ul>
                <li>{t('mutation.flowscanDescription2')}</li>
              </ul>
            </li>
            <li>
              <a
                target="_blank"
                href="https://github.com/avcdsld/code-as-art/tree/main/mutation"
                rel="noreferrer"
              >
                GitHub
              </a>
              <ul>
                <li>{t('mutation.githubDescription')}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
