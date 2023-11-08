import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Container from 'components/Container';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { swift } from 'react-syntax-highlighter/dist/cjs/languages/prism';
import { synthwave84 } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import useWindowSize from 'hooks/useWindowSize';

SyntaxHighlighter.registerLanguage('swift', swift);

export default function DigitalNativeArt() {
  const { t } = useTranslation();
  const [width] = useWindowSize();
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);
  const [showCode3, setShowCode3] = useState(false);

  const code1 = `pub contract DigitalNativeArt {

    pub resource Art {
        // This is the first resource named \`Art\` in the digital world.
    }
    
    pub fun create(): @Art {
        return <- create Art()
    }
}`;

  const code1_2 = `transaction {

    prepare(signer: AuthAccount) {

        // This is the first creation of an \`Art\` resource object in the digital world.
        var art <- DigitalNativeArt.create()

        // This is the first destruction of an \`Art\` resource object in the digital world.
        destroy art
    }
}`;

  const code2 = `pub contract ShipOfTheseus {
    pub var theShip: @[Ship]

    pub struct Memory {
        pub let timestamp: UFix64
        pub let event: String
        pub let executor: Address

        init(timestamp: UFix64, event: String, executor: Address) {
            self.timestamp = timestamp
            self.event = event
            self.executor = executor
        }
    }

    pub resource Ship {
        pub let id: UInt64
        access(account) var memories: [Memory]

        init(id: UInt64, memories: [Memory], executor: Address) {
            self.id = id
            self.memories = memories
            self.memories.insert(at: 0, Memory(timestamp: getCurrentBlock().timestamp, event: "init", executor: executor))
        }

        pub fun touch(executor: &AuthAccount) {
            self.memories.insert(at: 0, Memory(timestamp: getCurrentBlock().timestamp, event: "touch", executor: executor.address))
        }

        pub fun getMemories(): [Memory] {
            return self.memories
        }
    }

    pub fun touch(executor: &AuthAccount) {
        let ship = &self.theShip[0] as &Ship
        ship.touch(executor: executor)
    }

    pub fun renew(executor: &AuthAccount): @Ship {
        // Here, the ship is replaced by a new resource object, with the same ID and memories, but a different UUID.
        let ship <- self.theShip.removeFirst()!
        self.theShip.append(<- create Ship(id: ship.id, memories: ship.getMemories(), executor: executor.address))
        return <- ship
    }

    init() {
        self.theShip <- [<- create Ship(id: 0, memories: [], executor: self.account.address)]
    }
}`;

  const code3 = `// This smart contract does not implement the NonFungibleToken interface.
// The planarias are just that, as they are.

pub contract Planarias {
    pub var population: UInt64

    pub event Begin()
    pub event Born(name: UInt64, genes: Genes, generation: UInt256, motherName: UInt64?, fatherName: UInt64?, meiosisAlgorithm: Type)
    pub event In(name: UInt64, to: Address?)
    pub event Out(name: UInt64, from: Address?)
    pub event Die(name: UInt64)
    pub event End()

    // Planarias' meiosis algorithm is open to change. Anyone can evolve them.
    pub struct interface IMeiosisAlgorithm {
        pub fun divide(genes: Planarias.Genes): UInt256
    }

    pub struct MeiosisAlgorithm: IMeiosisAlgorithm {
        pub fun divide(genes: Planarias.Genes): UInt256 {
            let randomChiasmaMask = fun (): UInt256 {
                var mask: UInt256 = 0
                var val: UInt256 = unsafeRandom() % UInt64(2) == 0 ? 0 : 1
                var i = 0
                while i < 256 {
                    let length = Int(unsafeRandom() % UInt64(128))
                    var j = 0
                    while j < length {
                        mask = (mask << 1) + UInt256(val)
                        j = j + 1
                        if i + j >= 256 {
                            break
                        }
                    }
                    i = i + j
                    val = (val + 1) % 2
                }
                return mask
            }
            let chiasma = randomChiasmaMask()
            let sequence = (genes.primary & chiasma) | (genes.secondary & (chiasma ^ UInt256.max))
            let mutation = UInt256(1 << Int(unsafeRandom() % UInt64(256)))
            return sequence ^ mutation
        }
    }

    pub struct Genes {
        pub let primary: UInt256
        pub let secondary: UInt256

        init(primary: UInt256, secondary: UInt256) {
            self.primary = primary
            self.secondary = secondary
        }
    }

    pub resource Planaria {
        pub let name: UInt64
        pub let genes: Genes
        pub let generation: UInt256
        pub let birthtime: UFix64
        pub let motherName: UInt64?
        pub let fatherName: UInt64?
        pub var copulatoryPouch: {UInt64: UInt256}
        pub var meiosisAlgorithm: {IMeiosisAlgorithm}

        init(genes: Genes, generation: UInt256, motherName: UInt64?, fatherName: UInt64?, meiosisAlgorithm: {IMeiosisAlgorithm}) {
            self.name = self.uuid
            self.genes = genes
            self.generation = generation
            self.birthtime = getCurrentBlock().timestamp
            self.motherName = motherName
            self.fatherName = fatherName
            self.copulatoryPouch = {}
            self.meiosisAlgorithm = meiosisAlgorithm

            Planarias.population = Planarias.population + 1
            if Planarias.population == 1 {
                emit Begin()
            }

            emit Born(
                name: self.name,
                genes: self.genes,
                generation: self.generation,
                motherName: self.motherName,
                fatherName: self.fatherName,
                meiosisAlgorithm: self.meiosisAlgorithm.getType()
            )
        }

        pub fun reproduceAsexually(): @Planaria {
            return <- create Planaria(
                genes: self.genes,
                generation: self.generation + 1,
                motherName: self.name,
                fatherName: nil,
                meiosisAlgorithm: self.meiosisAlgorithm
            )
        }

        pub fun reproduceSexually(): @Planaria {
            pre {
                self.copulatoryPouch.length > 0: "no father gene"
            }
            let fatherNames = self.copulatoryPouch.keys
            let fatherName = fatherNames[Int(unsafeRandom() % UInt64(fatherNames.length))]!
            let fatherGene = self.copulatoryPouch.remove(key: fatherName)!
            let motherGene = self.meiosisAlgorithm.divide(genes: self.genes)
            return <- create Planaria(
                genes: Genes(primary: fatherGene, secondary: motherGene),
                generation: self.generation + 1,
                motherName: self.name,
                fatherName: fatherName,
                meiosisAlgorithm: self.meiosisAlgorithm
            )
        }

        pub fun copulate(father: &Planaria) {
            let fatherGene = father.meiosisAlgorithm.divide(genes: father.genes)
            self.copulatoryPouch.insert(key: father.name, fatherGene)
        }

        pub fun inject(meiosisAlgorithm: {IMeiosisAlgorithm}) {
            self.meiosisAlgorithm = meiosisAlgorithm
        }

        destroy() {
            emit Die(name: self.name)
            Planarias.population = Planarias.population - 1
            if Planarias.population == 0 {
                emit End()
            }
        }
    }

    pub resource Habitat {
        pub var planarias: @{UInt64: Planaria}

        init () {
            self.planarias <- {}
        }

        pub fun out(name: UInt64): @Planaria {
            let planaria <- self.planarias.remove(key: name) ?? panic("Missing Planaria")
            emit Out(name: planaria.name, from: self.owner?.address)
            return <- planaria
        }

        pub fun in(planaria: @Planaria) {
            let name: UInt64 = planaria.name
            self.planarias[name] <-! planaria
            emit In(name: name, to: self.owner?.address)
        }

        pub fun getNames(): [UInt64] {
            return self.planarias.keys
        }

        pub fun borrowPlanaria(name: UInt64): &Planaria? {
            return &self.planarias[name] as &Planaria?
        }

        destroy() {
            destroy self.planarias
        }
    }

    pub fun createHabitat(): @Habitat {
        return <- create Habitat()
    }

    pub fun generate(): @Planaria {
        let newGene = fun (): UInt256 {
            return UInt256(unsafeRandom()) + (UInt256(unsafeRandom()) << 64) + (UInt256(unsafeRandom()) << 128) + (UInt256(unsafeRandom()) << 192)
        }
        return <- create Planaria(
            genes: Genes(primary: newGene(), secondary: newGene()),
            generation: 0,
            motherName: nil,
            fatherName: nil,
            meiosisAlgorithm: MeiosisAlgorithm()
        )
    }

    init() {
        self.population = 0
        self.account.save(<- create Habitat(), to: /storage/PlanariasHabitat)
        self.account.link<&Planarias.Habitat>(/public/PlanariasHabitat, target: /storage/PlanariasHabitat)
    }
}`;

  return (
    <Container title="Digital Native Art Series – ara721.art">
      <div className="justify-center max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Digital Native Art Series
        </h1>
        <h3 className="mb-4 text-black dark:text-white">
          {t('digitalNativeArt.workInfo')}
        </h3>
        <Image
          alt="Mutation"
          height={400}
          width={600}
          src="/static/images/digital-native-art.png"
          className="mt-4 mb-8"
        />
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {t('digitalNativeArt.abstract')}
        </p>

        <div className="mb-8 prose dark:prose-dark leading-6">
          <hr />

          <h3>{t('digitalNativeArt.digitalNativeArt')}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('digitalNativeArt.digitalNativeArtDescription')}
          </p>
          <button className="text-gray-600 dark:text-gray-400" onClick={() => { setShowCode1(!showCode1); }}>
            {showCode1 ? '-- ' : '+ show code'}
          </button>
          {width && showCode1 && (
            <>
              <SyntaxHighlighter
                language={'swift'}
                style={synthwave84}
                layout="responsive"
                customStyle={{
                  maxWidth: width - 60
                }}
              >
                {code1}
              </SyntaxHighlighter>

              <div className={'mt-8'}></div>

              <SyntaxHighlighter
                language={'swift'}
                style={synthwave84}
                layout="responsive"
                customStyle={{
                  maxWidth: width - 60
                }}
              >
                {code1_2}
              </SyntaxHighlighter>
            </>
          )}
          <p className="text-gray-600 dark:text-gray-400">
            <a
              className="text-gray-600 dark:text-gray-400"
              style={{ textDecoration: 'none' }}
              target="_blank"
              href="https://www.flowdiver.io/contract/A.a19cf4dba5941530.DigitalNativeArt?tab=deployments"
              rel="noreferrer"
            >
              {'> deployed contract'}
            </a>
          </p>


          <h3>{t('digitalNativeArt.shipOfTheseus')}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('digitalNativeArt.shipOfTheseusDescription')}
          </p>
          <button className="text-gray-600 dark:text-gray-400" onClick={() => { setShowCode2(!showCode2); }}>
            {showCode2 ? '--' : '+ show code'}
          </button>
          {width && showCode2 && (
            <SyntaxHighlighter
              language={'swift'}
              style={synthwave84}
              layout="responsive"
              customStyle={{
                maxWidth: width - 60
              }}
            >
              {code2}
            </SyntaxHighlighter>
          )}
          <p className="text-gray-600 dark:text-gray-400">
            <a
              className="text-gray-600 dark:text-gray-400"
              style={{ textDecoration: 'none' }}
              target="_blank"
              href="https://www.flowdiver.io/contract/A.569087b50ab30c2a.ShipOfTheseus?tab=deployments"
              rel="noreferrer"
            >
              {'> deployed contract'}
            </a>
          </p>

          <h3>{t('digitalNativeArt.planarias')}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('digitalNativeArt.planariasDescription')}
          </p>
          <button className="text-gray-600 dark:text-gray-400" onClick={() => { setShowCode3(!showCode3); }}>
            {showCode3 ? '--' : '+ show code'}
          </button>
          {width && showCode3 && (
            <SyntaxHighlighter
              language={'swift'}
              style={synthwave84}
              layout="responsive"
              customStyle={{
                maxWidth: width - 60
              }}
            >
              {code3}
            </SyntaxHighlighter>
          )}
          <p className="text-gray-600 dark:text-gray-400">
            <a
              className="text-gray-600 dark:text-gray-400"
              style={{ textDecoration: 'none' }}
              target="_blank"
              href="https://www.flowdiver.io/contract/A.d370ae493b8acc86.Planarias?tab=deployments"
              rel="noreferrer"
            >
              {'> deployed contract'}
            </a>
          </p>

        </div>
      </div>
    </Container>
  );
}
