import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Container from 'components/Container';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import useWindowSize from 'hooks/useWindowSize';

export default function SelfReplication() {
  const { t } = useTranslation();
  const [width] = useWindowSize();

  const code = `pub contract SelfReplication {
    pub let name: String

    init() {
        self.name = "SelfReplication"
    }

    pub fun replicate(account: AuthAccount) {
        account.contracts.add(
            name: self.name,
            code: self.account.contracts.get(name: self.name)!.code
        )
    }
}`;

  return (
    <Container title="Self-Replication – ara721.art">
      <div className="justify-center max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-2xl md:text-4xl mb-4 text-black dark:text-gray-200">
          Self-Replication
        </h1>
        <h3 className="mb-4 text-black dark:text-gray-200">
          {t('selfReplication.workInfo')}
        </h3>
        <Image
          alt="Self-Replication"
          height={300}
          width={600}
          src="/static/images/self-replication.png"
          className="mt-4 mb-8"
        />
        <p className="text-gray-600 dark:text-gray-200 mb-8 prose">
          {t('selfReplication.abstract')}
        </p>

        <div className="mb-8 prose dark:prose-dark leading-6">
          <h3>{t('selfReplication.codeExecution')}</h3>
          <p className="text-gray-600 dark:text-gray-200 mb-8">
            {t('selfReplication.codeExecutionDescription')}
          </p>

          <h3>{t('selfReplication.codeIncubator')}</h3>
          <p className="text-gray-600 dark:text-gray-200 mb-8">
            {t('selfReplication.codeIncubatorDescription')}
          </p>

          <h3>{t('selfReplication.codeDescription')}</h3>
          <p className="text-gray-600 dark:text-gray-200 mb-8">
            {t('selfReplication.codeDescriptionDescription')}
          </p>

          {width && (
            <SyntaxHighlighter
              language={'plaintext'}
              style={a11yDark}
              layout="responsive"
              customStyle={{
                maxWidth: width - 60
              }}
            >
              {code}
            </SyntaxHighlighter>
          )}

          <hr />

          <h3>{t('selfReplication.links')}</h3>
          <ul className="text-gray-600 dark:text-gray-200 mb-8">
            <li>
              <a
                target="_blank"
                href="https://www.flowdiver.io/contract/A.fe437b573d368d6a.SelfReplication?tab=deployments"
                rel="noreferrer"
              >
                Flow Diver (Contract)
              </a>
              <ul>
                <li>{t('selfReplication.flowdiverDescription1')}</li>
              </ul>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.flowdiver.io/tx/8370eac87ff425531c3041a7f99aae0bbfc924de87b64d785f3b94f742485670?tab=script"
                rel="noreferrer"
              >
                Flow Diver (Transaction)
              </a>
              <ul>
                <li>{t('selfReplication.flowdiverDescription2')}</li>
              </ul>
            </li>
            <li>
              <a
                target="_blank"
                href="https://github.com/avcdsld/code-as-art/tree/main/self-replication"
                rel="noreferrer"
              >
                GitHub
              </a>
              <ul>
                <li>{t('selfReplication.githubDescription')}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
