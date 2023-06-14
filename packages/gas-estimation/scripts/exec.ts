import { utils, providers } from "ethers";
import { BigNumber } from "ethers";
import { addDefaultLocalNetwork } from "@arbitrum/sdk";
import { ArbGasInfo__factory } from "@arbitrum/sdk/dist/lib/abi/factories/ArbGasInfo__factory";
import { NodeInterface__factory } from "@arbitrum/sdk/dist/lib/abi/factories/NodeInterface__factory";
import { ARB_GAS_INFO, NODE_INTERFACE_ADDRESS } from "@arbitrum/sdk/dist/lib/dataEntities/constants";
const { requireEnvVariables } = require('arb-shared-dependencies');

// Importing configuration //
require('dotenv').config();
requireEnvVariables(['L2RPC']);

// Initial setup //
const baseL2Provider = new providers.StaticJsonRpcProvider(process.env.L2RPC);
const GENERIC_NON_ZERO_ADDRESS = "0x1234563d5de0d7198451f87bcbf15aefd00d434d";

// The input data of the transaction, in hex. You can find examples of this information in Arbiscan,
// in the "Input Data" field of a transaction.
// (You can modify this value to fit your needs)
const txData = "0x08b2da0a000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000020e000000000000000000000000000000000000000000000000000000000000000146d919e4ed6add6c34b2af77eb6b2d2f5d27db11ba004e70734b23bd4321ea234ff8577a063314bead6d88c1b01849289a5542767a5138924f38fed551a7773db2261c88684048239f3df1f929d784ba2dd8cc24c8c9ec7419549f52b99f79bde9018cf4169b4f2b13427e4cb497d3f20aed6055c66a4c9b0800bf774442acaec92918ea8c584f3dc9717602f30c28161762beb32aa5c2250ff08e9ac0bb1d22611421c32cd3fd4df300aee8ec69630f28ce9c8e7a8c4a51de740c9286cd2af76f5d5629f7e9565d958a1261ed489160c1c3394855eb8d5e0fa9a70acbdac9beb00000000000000000000000056e43e525564345b503e31901617fa32c1d3f07189f779fc5b4f9838fe0488f485d39776831ad45087c4473e61cb8600cc671c8f623a268c53140cd15c81982780af1299df250de4f75b3139ce7ca5882b7f0376ee0146b6866a9e3f31d44170e08b64cd115ed44562e769a608ef43f1a319e7dedd5e38158c3bbaa08fd8659dfd963da2d055f8167adaa7d1b86726539ef5a77514d3fd1d391bcb3b08d4eed5bf6c1898798f74a254b08d8b39253a986fc671676d919e4ed6add6c34b2af77eb6b2d2f5d27db11ba004e70734b23bd4321ea234ff8577a063314bead6d88c1b01849289a5542767a5138924f38fed551a7773dbac49a54782096c9750c28a65a75d59725612bdc0228c8273aed4555bfbf09853485524a0c042adf185634225e62b789113bfca163ba22066b70ff0431d3cedc94e28979275f9babccd5e39271f5b07c274f4f2cb8866b90283e86e7b7dce709ef75d0fbec5c772d8b4f83c6ae960da3261d30e73ada1628b5dba595acfda8294c17ba7bf88b5ec68e0d444b60daea505ac5d2e50fac2284e59bb2e1f7adf8e0e000000000000000000000000d0afbb1163dc9380c7e8987fbb018ddd8419c15d1ec6bffbcfa91858909942cf5ca94110483a205efef1c0865056dc1396f6805c9a7b2349f2f3de19c368b29c323d1e65570a2b009c49809f8e7c8f99c42dd66e7994cac82a828289e93a54e81195232bbe2e694904c619023341aaf8f618338d49b69c76545062d0b25a96e50dfd8d3fb77f9566c90644763dedea416dfbc77acefb941e092f80ad2e5129cb82035297c17db895978573c6a8f8d75fe7d788166d919e4ed6add6c34b2af77eb6b2d2f5d27db11ba004e70734b23bd4321ea234ff8577a063314bead6d88c1b01849289a5542767a5138924f38fed551a7773db45d9073f99e60437dabcb6f499332f30c8deb233f1a9565873908908452003487cd7a902f3514edab05817314509ba6686bf8066dbbb0d70704f624fae3c412a2ff90b1f165a6ae594d42e5ec9a589879413cbebb1ee9fe24e50189efc7805162b5abe9655ec3f14d3476a39aaca0a1509d2d69b53eb3a3ff26d388b82de3c49c8dcbfc2df9fe2c8bb79a3751d7907c07d8009ca0a0673db5913b69cda6c93a3000000000000000000000000e79050d4c3f7af84f06878bc6de384b3217ea6f8b2dc975431d80eba4ab5a5607737abb5d3ca10f429f7b89d582622a437427126e7ef7d113f9c2af252be160fff1c1d0debf0765f0823fc12fa5abd9472343ade752e5a65a996cef55df5d4b4566f83ed89c570f632076ce307cc21f17c7d262ec5156ac00f013eef944f19706bb27b442bb4388c7bc10169addec0a073e9895c1731ad584375405d0ccebdc844ff9112ccf251e3948d248ec164dfafe4f25def6d919e4ed6add6c34b2af77eb6b2d2f5d27db11ba004e70734b23bd4321ea234ff8577a063314bead6d88c1b01849289a5542767a5138924f38fed551a7773db065c85efd1d343c926da680063d7391b488384eb53974d766ea338151a1d520c8f942491ed5fd8f6449e08a4366a8be8680d1285aef2d62d390f33b75b1f14217ca0d493a5355f8205a5a37b245b10ff1d68629b641cb8c2955c2abd59af82b8b00f05e648f4fd5e4b920be610a2617ad5f890649e2251c3ea8f13b3180d8988fad5c781c04a226023bd8a846c655629984ba02ae79b2d15af3f1573057a6a2400000000000000000000000002e012db4f64af2f0263e104e30cc858767a42182755d4ea9c8d363bd306bceb8b81df89f4b690c30d9dcee6b9f35059bb9b3008fdc0c15dee0edd6cd96f8580d112d2b345f5a853162d4d3c0f2d6d2b01d1e95e53f1d463f5ad46b32a15e8ef67138104427c44195b16e36fdbd2bd5158d546e5fa4ee1ba6fdd15d300b016ef945716bbe660865993932d2642e04013a77a7cbba6ff52a1efbfc16f76db8a55de47dfb17c880dba6e5947d8c1af12922ea0d3f76d919e4ed6add6c34b2af77eb6b2d2f5d27db11ba004e70734b23bd4321ea234ff8577a063314bead6d88c1b01849289a5542767a5138924f38fed551a7773db5b832d48b6943689ad1fe99e2b2b0ce02f61a07fad8e30f6e89b44c3a2d837f2293c2c337ef26f722c2d096fb808a7e27b82126c615d8d5a2d65443d7d091bda8dfc3b0de68aeddfd2808dae1f42ee69ed0bb9349f80f77768cc85f6fc29b0744c3e6cc94786058f20c41b4ce04482a781f6db5d7d5cbe6e6e8c716580c9aac48da75b49052b30a934eeaa8c38745cbdc807242f04a825d33f8acc5232ec14d4000000000000000000000000af8dc1bd8f5ae185904e2875f774870a9af37c95416769deb9662c3ab62cc345f47254b2e5f5cec5469125a8f9c9307cd2f710292fb373051e05e1fb9a8ec5411d9f68aae6b169fff59d68f7641651039c6f1bd56e872a3d21b1eef90545955fb3d8f9a7963bf4c906b6cd4cbebbcb049b320e9a4bf89a869e0005b1b1bb8d70716eb5c54a1559ab2685f0ba627952f1bf7178b9b7df99dad1721ca0fb72a8e4fe9bbc841ef28511dc666ce84263e408962aeb2e6d919e4ed6add6c34b2af77eb6b2d2f5d27db11ba004e70734b23bd4321ea234ff8577a063314bead6d88c1b01849289a5542767a5138924f38fed551a7773dbf1539b6705b71ded0da5cae47edb8ce7d68625dc76fafec39dd57a65c6626b2973640fd11a44066c7413bcc5464bed69a613aaf2e636eafc2471c26c0e6e9aa35097189d98912dfc857c61d206c279c01160437bee6376a6767a145080d054f16cfb427efc6dcfac0334cb0bd643cff476b0f02b406fae6206ec968b6163afb50d702d00332d52905dd055803aa0b2310eb4d87189cf431ff0473f4ba00ca6c9000000000000000000000000313233367a873af1311c2d5a36bc58850158157bd3fb79b056f419a08d505e75a76e6da814c0d5e68f21917f198495f86a719e3fa7ce4fc48410d0418f5ae3b0b3cb4f9fb5d3486ad7f44e1fc31d613394f45ad9cddce0d403e2b296f9930bd6e4bc136e7ee38938135e17a71e433d14ae9a5e20e40ddcd922d124db05e8ebab83af351dad7b64ce6863534b16917632fab40f3045d1fc131fd0cd22ec79eb0abbd8e8b820997ca689acfb53ab7d5bba1137f3ee6d919e4ed6add6c34b2af77eb6b2d2f5d27db11ba004e70734b23bd4321ea234ff8577a063314bead6d88c1b01849289a5542767a5138924f38fed551a7773db263fd6f10380558c3801e3e0eb275ff9df33482dc05df3f915c4ee954d1d3b3d2dbc43641376f63e8bf00f35219db7751e7b44b525b578bf332f85c04e4d75bc68566c524c5714c49569fe1810d42fd0c9a97e6e24ca75ed1f360715230c6a031923468b9f9e595ee757ef3f8bc0702d891b56a5e9ab02058d7e0bdbb555b0f177d1644c55a56739d0638bed9ae496e93ba3c69a2cec6e157286a4b332948bd30000000000000000000000000ca586a678c49bcb499ae46d905ffb41169851e13f782ddc7e175c4a3a1fcb15ea20297266f404d624e185969d8a11a1aa7f5cddbcaa182f3ba1b0e51afc37983c2d581d6b6fc0f21438a2db54e78161e24a7a60d2df1174cacd2da15954634d7df56a8554fd2fc9fc4b3b7f7ea1ea9e2f7351aaf3802b77b8ddccdc397902aae8b0e9248859c665739245d976e448aac64ee4b82b2fa30f45f3479f162fbdde0042d0a74adb3349133e565d604327088d8cfff46d919e4ed6add6c34b2af77eb6b2d2f5d27db11ba004e70734b23bd4321ea234ff8577a063314bead6d88c1b01849289a5542767a5138924f38fed551a7773dbed922639b322e60e0d1d2a40d6c1f6987517c73e53be5016439242eb4755ccf4a9b5a0ac41447cc93ab9657739623a5e1db004b2349ee3c59dcad6e7649de615497b2b91c6f21468e4931bf59efb071f76d59f0050f756c145a7fa28d71d5b33111f9df155e38cb02584cb3d4496b35cf519f71acc4bd6d8c7bd88666d677de80e805c596490c36d9e3212e72b735d524e2a57b4ea3a2a521e475aaab5297d66000000000000000000000000ca5e469db27d7af5f356707fffe9585d012eacf33490ae17b85b41d751a4229f5b223c45f649cd3edbdc7463c1ad4570427dc1803e9fe8e7642729834f500eefb72d05a0fe0f579a4603d25b12d88f66364878e3cf9c13d2bb75ed59aa1b86dfb91f573642097f848cde7093b720f7c0f49c430abd7c4fe0b1e3f691b892a9511e7ba61d2806c75e3e159585e594aa9f372276a9980291506b20dabf1cf76c6b2012353023473e6f8ee35ed650b05934d09e1d096d919e4ed6add6c34b2af77eb6b2d2f5d27db11ba004e70734b23bd4321ea234ff8577a063314bead6d88c1b01849289a5542767a5138924f38fed551a7773db3f22e6b1e330b27a66349edfbef16d15947183057bef3e60e6de9246b0930ab2d9423c9a91be8e72e3473d13ca4bc4956997ae5840f5f0e5cddbdc9a5c74dc0cb98d054ef4b2fc61b5c5818ab8e0f49a82882115d58d3d45f5299b995f762797d9138c38994e3e294e8bf4c48f53c5f890be58dbbb1cdd88528e83daf409f0b22d1b8662179773951660befcb790a1d532903b47efd0b2fb67cb5a0222809e1a000000000000000000000000aa51331b60d51454a92fbe24f2b89e676a0f7dd019a6593f65ecc8be2585b0656411fc87f0e86872b924acd1b0320569b21d0ba51979667824d784d706a1f5bbff0ba7fe40ec5bed2d1d8a77cfb53303f63a856d01f76cfa65e3eba2cb3416f3bf12095de72922cbdaa41c9648075f77be067d90748c122cb57a7641572cfdd1650f1706e60028faf928e7a4b65c67f9de6d5a3b1f8403505eb8df149c926762fe703428b6d2a51c67fade3fe8817216596dbc0b6d919e4ed6add6c34b2af77eb6b2d2f5d27db11ba004e70734b23bd4321ea234ff8577a063314bead6d88c1b01849289a5542767a5138924f38fed551a7773db1fd4ff176215a3236b13f9acad6ddb8cc90d8f4a0b6a1613029ceca3c2a496a39d0a69aa17bc7466c9a0d40fb1931c1ae351d1146005ed316fa1589d6e9cd77a9868e6ee68c3e4cfc8934faab3ff106b3926672db56959720cc27da42d9576f8c66362f8c28430b225417e6321f51437fb3f28504ae42f5ec38bba97649f50a9fcc1817ee01d0fb23631d2add0b8925e15f6687a0d6d3724bdfb71793c47cba3000000000000000000000000fba553620ef3e50c9d4fbd9c2114e28b34bcee5692530c732d4bc382ce33a4f66111d8999d4cc5597b5d2034ac9be3ded997bc10485325320eef9cdf36e6a7a5995347b9f2267bb73b2fe987f3154b0ea8ffa127100a9c875f73610cfb026eb3c69185c6e8b68ceba2666ad37694a284292ea61a89176107ece2df7c378a0079c44e286652c63524ff775e4bf26fea3ab761df9e53ea2846e25cd45e65aac537d9a3c7e9fa198416f4061957fd1641dc46d3a59a6d919e4ed6add6c34b2af77eb6b2d2f5d27db11ba004e70734b23bd4321ea234ff8577a063314bead6d88c1b01849289a5542767a5138924f38fed551a7773dbe84b0ab334da78b53ba7b777ba7de78f0c9356e08ce5e60ad8568c2f3e786496912eaf78b2671ffea1569b883b1b775658da21663bd47e1e7c5475a4b572633e96f8296091f8ce721c4061c8f3dc558b23796cee8f3fc34fb1f36713c9b93d30ca3a433c9cdcca54d0bb40cf5547a5fdd2dadc5097c3a9ae0f27b128c436aa64223930b30d2b57e6c75bc144a8c76475df4abf66e605c27b4c8d4f6b81fd535f000000000000000000000000c579815b26f69018bb7879b19b1258b744af4b6b91c733e7747859dd75350b2d33097535f117ecc2a0f626bd0ad0becabc561d749dd35e222b9aaa9e026173f2f284bf678f934b42113f4bfdc903c72953d74b10f5292a3b394f78f6a0e93b4a282d8d6be0aad65782c13c51ab2765a87a7adcbbfbaf5ee87bb11db229d8b8142c83627d2b9721192740b4a5b0ad4d00aa320d0555b68392f9659f2eb92ba261c0bf228af81741adb63e7c251605b4e1a1e4ce166d919e4ed6add6c34b2af77eb6b2d2f5d27db11ba004e70734b23bd4321ea234ff8577a063314bead6d88c1b01849289a5542767a5138924f38fed551a7773dba96dd0fbeb5f96b585e36a6fc15462e393bb9dd5bf5c799ba33f9f2e0e0415e3d3f2b6de5c11f2b9fd4bcd38768e5ca65d712ebec87edcfaea2652271bd1a3e5b5934b4482fd16ef6d90c1b174db34b12baefcf87c4d9f0e76c6e8897d67ba15180434bea3516efe65ec0455fb0870362838e44915d1d8573f355658ebc753dae42cd8302b95d27f84ebcdeadc0823f60c5d9a49912349799da00707f70e8fad00000000000000000000000071a26f93638591f664aa8424f579da32a0d21b86659f5cf51a781fce13e12cbca0f5b3e363d51124decfe13c004d502df3c60db9c6de86312e4430a1c7c555a47cae1d69fe47f7da8fb9a6b4afb3c262645f5c354d40a8ebabc81f65049f85f9e83250a9a6db6f4de44ec2edcd1e9e32fae95c88c34b471a1168f78ff9ef09aaea819fa2f0c6c9fc6d53b12705c3acf08750bc844586ad8d459448cba092263f059556c793c5495dd3e8e4d2f41f0c8ef7c4725e6d919e4ed6add6c34b2af77eb6b2d2f5d27db11ba004e70734b23bd4321ea234ff8577a063314bead6d88c1b01849289a5542767a5138924f38fed551a7773db446d57498a973c6c39b28d9214194436d969c9823b5dc9b5e77fda70c6ad9d2a848c303f5b215aa7f1d41f688af65ec1672c2cf6222545b9cbb4fd3ce9ea2e976ec55c6c3d687b22764b823c4643875b6aef50c04bdf73881f67fb6af4a3c03f21d5c3f18fbb3e46e69740a9b9c804d795200beed5d9a0e97f2321872ef9ea8fe0b00563c898a89da542663ef38b3e21653eae6fdd54783020191b1bfe29224f0000000000000000000000003848329829c3bd178358c9d8c5553925fdd9ebac5327248099797d7f751695b39765b7ed77ba00d989dbd9b2ca5f340f03594952300fcc89af2b9bfc9c9b99b28ba4016aa73f4b2d6a9162236d0c5c5ec099a38c2d72634647da2cf5535f70d8ebeb599056d3648cd2cb7fe0e66df578fb0ffca8b784ec34fb1a0d0cd1a7429589238da4dbc74007b23630cb06ed9fd0e3bb78b120d2d782e444f1271e43a07ce441e93c214f331dc023eb6c362cf374a30f0e276d919e4ed6add6c34b2af77eb6b2d2f5d27db11ba004e70734b23bd4321ea234ff8577a063314bead6d88c1b01849289a5542767a5138924f38fed551a7773dbbaa469464085ad7c40a8db5e81a42f295ecde919a295dfdadb5349dbf068e7e712bb8be8c2beb67baa74c0b3f441199871c491a645ab33fb54a43d262a44345ebc8b4dedba690e61716c0bcb9a7cb7efdfdbf4d48c50b7a07f53248c76a346bbbb5decf1a119e09ba23db870af94ae7d047b9efcc8631b3576ac3cdcdd6cdd38f52273cc5f2214d6b6e15751130392264c7abec8db9be7f6e6e69d1b554b8e0c000000000000000000000000f8350e25875296d0d0091fe84c8a14a43ae16d4572f991914de67e5a69c12be1e9e28d96da6608ee50b2f7a2aac5fe29f305380f0a0e39cd9aab7d58e24b96d0fe1bc7e7aee2f0ddd29320b53d3185d94fd6c57776cbfe839ee24929a57ce7e81005cf645e762c430935e7056a830d0f4c142f9063a196a3b960feac7d094e02ed118ccebceadbbb423e702ccd6f9994b0ccb31518a77144d55903df30431db03c95e97ba1d8c8d8b86b736e4d70befac0e3479e6d919e4ed6add6c34b2af77eb6b2d2f5d27db11ba004e70734b23bd4321ea234ff8577a063314bead6d88c1b01849289a5542767a5138924f38fed551a7773db883da22278eb325103fb6410356a04d32522acc912a2dd58b4f917935388936d3da0c85c2cc43ce9e5084dc9a7762906b9a02e916af72e351e6e8e8cd6cfb62998e661db888d742c124cfbb139184b5e957e1ffca983b5b6915b749b482c8beffe93cb6972d8f3468b525a78985364a61fcd95b7ce46acae12a32c7f7894cb9c48adc174aa9812eaf481ba8720e4f7d548d4582e7ad8962323163d3331cd48d50000000000000000000000004286672eaa03a46847c32de39263d63c93931f7a141219ee8dd260f547b0c7325307bd4c55eb4b0500557a59e3872b0689bc31b901af0f54ac6bbde5f03da623f062a911972667a42406b56af3bce2bdfca0d0be754d92eac31f0f822235418cab7e15585414b37a22c6dc79c30f90f13cd2ddbfd8f8ba17a8b0d74c40ac7f77fcd5abcf8ca5037975c58658ef7ab77b3943926066317372784e154f0da1f8ae928445f692f3d41083e1800f23daea2ca67813246d919e4ed6add6c34b2af77eb6b2d2f5d27db11ba004e70734b23bd4321ea234ff8577a063314bead6d88c1b01849289a5542767a5138924f38fed551a7773db8756cd1dd162fec043e615394bc21a126314dba481df4db282a1b9d48d17799e11a19277a092864c7efdec1a9453b2a113c0ee714a60a09126af801f5da01752c02def9f5156f754ee7c516b7de1688625566977cc8013e28c701ad572cdb1239a1d31bb3d939f96443310b6ac7171a94000ae27b50f4862d138960e3180131dda3faa104000591d0977c24c36c9da48a4df2d3e78879d0d1fe911c97183643f0000000000000000000000003a1e48b25e9aca459cfa42278dff8dd894fc273cc2734fe67d53c34bf2f3ec0f96fbff065d525891ab152b0a6fb13e692a2a3ea5933f157f68c9f79057b69c271ce6d9218c41960cb91944668a28f968a05b247a6ace3c3013b1a90adf027130ef635ab52dd5fe14310cf1d98665c2b29f9cab6912f8dea7c850a1afca3b0d32fa34ab641a3690f2ea1d2b5acfcfc3f298d98af696ed7d59752969666e261f9d84ec9ccc889b350dc4865c3cf858ac25e98de36a6d919e4ed6add6c34b2af77eb6b2d2f5d27db11ba004e70734b23bd4321ea234ff8577a063314bead6d88c1b01849289a5542767a5138924f38fed551a7773db7e4f8ece62a9fc83e65c35b7d75ceed2e9f056950993a4adb94f21137c9e97daf0d0b8f2dc23eda3daf52bef74255c30b1b9a9669f6fc521265c94ecaa6e32d78b4c9c6867ad90eabdce827c5107bb4034260b58d145b667c571f6a2eb6463d7153f0f9c4886442960522d2ed415be45d223173962d2cc7fed4ce2dfcfd95be7d804661756cb7c74dc6f22c3788aec3365aa9c96e46ddc10469f3b213e7c47620000000000000000000000006eb64968a08f350accbf3d3e0993e6d4955a0b95dccd4aaa8fda030485c95e8a0774c87fff9a1a464436cf52c3d99cac03419c672dcde6d8b4da1562368169e2cbf17c98612c745ba2529378032590f7b66e456cf07d7539d4959341179b6cb46be93c66a26c62e67cd6431c17ea133a0e3f2f8335712d01fc61c0e467d1cd00675fd4ec1f9e35064b3325c97a542f79527693eea285e912da13b13b4f4e1174e0209c789e6bb86126e4a790238df686090350ec6d919e4ed6add6c34b2af77eb6b2d2f5d27db11ba004e70734b23bd4321ea234ff8577a063314bead6d88c1b01849289a5542767a5138924f38fed551a7773dbcd85d9e0aeb564c0787bd2c7833b0841b4e952c605ce8c11d892b9cd82ca8c0a68b33bcfdb62c087674e6b90bda48bbcdcd92e502b14f8b09c6bb1054edf6932129e853235a7d4f86303016f38b85c12ca11dffe03850ee9a0494cc42f13b53dd6b96c2c9170df478957a379f70ddd54f531ccd818bb2283a14ffcad37115b59752e0204fb03dc8af5b28b80809bdff44d8c5f5147c7e462e8410f8e406bd2330000000000000000000000004f43939cb08afafaa894c3ee77f678199f9309902f59692382be53ea0568d7976c430c97cc6a6cbdae01c12b89f9eef30837a41e261164ae6e417e56922d8eb4beaee649f287a5a5d60a001364976c032b087bf53bc47a4e8c2b03a7af9ea8a6454f822048df833c157f3c9e1d1ca4d121034daad5ee5be7cff2f4ef38ee1c38c640cc5e890e21adc4d9e1b63cf996394ebce9859a3d0003db5cc91a22a82b2af9065282a92ca9b5ebf8319eb6c9d98200fb10906d919e4ed6add6c34b2af77eb6b2d2f5d27db11ba004e70734b23bd4321ea234ff8577a063314bead6d88c1b01849289a5542767a5138924f38fed551a7773dbe9adb5e5b2d3c7c60ff0ec39fbf8ed9b8e1e0ae153a3d15420f49c6dbb10b06ea6e78a7c3a3796300f0a31ca3b296f9be74a62408ae336fe1a2e7950c057ab1eea464e102d747d3281ae541e50ee5fc468d37c0b2f276f2dcbbad3a515af7b5cdbee47c8e21e1c3b6ad183e394a199e980242787006244d2db0d000f99e69b74a69757fe8e9fa55fff3302e3720dbc2fc70828f411cbd7995c7acb0c1f964bdb000000000000000000000000b13bdefa6082fec0c59fa6f1dff52d345592f5b5a758bfff875d5b8b75db21c1effd04ba9099b21f703f9eb542d3cdc3ab63d0248a0dfcb5191cd75ca5ca44d63df6cbf9aecf01d376fb69ce224796ad5f4d6939e5fe5627fc444136928b3d5cb78cd9ec4a04ec056f28cb0fe69d718b79ad1cbd7a995f582370440465ae2085e74656b9b77a3eb6f2821669b10a14fa460c36a663fc9d600b727352018d21dfabbba5a8f5426b4c3aa8201e51d8bc6c2e5456a56d919e4ed6add6c34b2af77eb6b2d2f5d27db11ba004e70734b23bd4321ea234ff8577a063314bead6d88c1b01849289a5542767a5138924f38fed551a7773dbab14a6692b5036106856f35edc54edfa6fdcaf92959590386536907603627ef09f503f6215b807ca1fd79be0d6c032cd2a765d7dc18e1913a8a858b1daec1bee5944a10d960364dcf936c3249dcf294cf819329e3f4d51af89fd6a89736b5723b0db7bbf9eba00ab62bb82220d22a66c5e9d8ba06295b6590793be85d69aabe8407e367f5a5ae17e816d1e8824be7ba57d3a9d6e284bc66891657b10e7510c43000000000000000000000000d1e239fd47c6dff560243dcfaf842cea69e76efb5901bcef6db441413bf7cfff36289be6cd22ae732115c65aa544ce4c2a32f7cb971c4d14c31d318f0fd4a7df34cd1981033c89c0955612a459ca86951ea91cd2c68a7bc83d0cd97998b75169792ac180c2fc7362bb9200b29dcdf6831dbebafffcb4d37eb558d46b89b93ec96618cfc57c6ce5f7bbcaa98788e1e69dfaed1e03231ea9b99148486c3e8f8a728c2b7fb6aa1aeb0250d8c99ea31c56d8bf50607d000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000006eb1db0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000c35000000000000000000000000000000000000000000000000000000000000000010000000000000000000000004918d8c58ddc5fc697ba1ccf3fd8c8faf8a1006c00000000000000000000000000000000000000000000000000000000006eb1db0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000c35000000000000000000000000000000000000000000000000000000000000000010000000000000000000000004918d8c58ddc5fc697ba1ccf3fd8c8faf8a1006c00000000000000000000000000000000000000000000000000000000006eb1db0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000c35000000000000000000000000000000000000000000000000000000000000000010000000000000000000000004918d8c58ddc5fc697ba1ccf3fd8c8faf8a1006c00000000000000000000000000000000000000000000000000000000006eb1db0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000c35000000000000000000000000000000000000000000000000000000000000000010000000000000000000000004918d8c58ddc5fc697ba1ccf3fd8c8faf8a1006c00000000000000000000000000000000000000000000000000000000006eb1db0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000c35000000000000000000000000000000000000000000000000000000000000000010000000000000000000000004918d8c58ddc5fc697ba1ccf3fd8c8faf8a1006c00000000000000000000000000000000000000000000000000000000006eb1db0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000c35000000000000000000000000000000000000000000000000000000000000000010000000000000000000000004918d8c58ddc5fc697ba1ccf3fd8c8faf8a1006c00000000000000000000000000000000000000000000000000000000006eb1db0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000c35000000000000000000000000000000000000000000000000000000000000000010000000000000000000000004918d8c58ddc5fc697ba1ccf3fd8c8faf8a1006c00000000000000000000000000000000000000000000000000000000006eb1db0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000c35000000000000000000000000000000000000000000000000000000000000000010000000000000000000000004918d8c58ddc5fc697ba1ccf3fd8c8faf8a1006c00000000000000000000000000000000000000000000000000000000006eb1db0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000c35000000000000000000000000000000000000000000000000000000000000000010000000000000000000000004918d8c58ddc5fc697ba1ccf3fd8c8faf8a1006c00000000000000000000000000000000000000000000000000000000006eb1db0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000c35000000000000000000000000000000000000000000000000000000000000000010000000000000000000000004918d8c58ddc5fc697ba1ccf3fd8c8faf8a1006c00000000000000000000000000000000000000000000000000000000006eb1dc0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000c35000000000000000000000000000000000000000000000000000000000000000010000000000000000000000004918d8c58ddc5fc697ba1ccf3fd8c8faf8a1006c00000000000000000000000000000000000000000000000000000000006eb1dc0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000c35000000000000000000000000000000000000000000000000000000000000000010000000000000000000000004918d8c58ddc5fc697ba1ccf3fd8c8faf8a1006c00000000000000000000000000000000000000000000000000000000006eb1dc0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000c35000000000000000000000000000000000000000000000000000000000000000010000000000000000000000004918d8c58ddc5fc697ba1ccf3fd8c8faf8a1006c00000000000000000000000000000000000000000000000000000000006eb1dc0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000c35000000000000000000000000000000000000000000000000000000000000000010000000000000000000000004918d8c58ddc5fc697ba1ccf3fd8c8faf8a1006c00000000000000000000000000000000000000000000000000000000006eb1dc0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000c35000000000000000000000000000000000000000000000000000000000000000010000000000000000000000004918d8c58ddc5fc697ba1ccf3fd8c8faf8a1006c00000000000000000000000000000000000000000000000000000000006eb1dc0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000c35000000000000000000000000000000000000000000000000000000000000000010000000000000000000000004918d8c58ddc5fc697ba1ccf3fd8c8faf8a1006c00000000000000000000000000000000000000000000000000000000006eb1dc0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000c35000000000000000000000000000000000000000000000000000000000000000010000000000000000000000004918d8c58ddc5fc697ba1ccf3fd8c8faf8a1006c00000000000000000000000000000000000000000000000000000000006eb1dc0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000c35000000000000000000000000000000000000000000000000000000000000000010000000000000000000000004918d8c58ddc5fc697ba1ccf3fd8c8faf8a1006c00000000000000000000000000000000000000000000000000000000006eb1dc0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000c35000000000000000000000000000000000000000000000000000000000000000010000000000000000000000004918d8c58ddc5fc697ba1ccf3fd8c8faf8a1006c00000000000000000000000000000000000000000000000000000000006eb1dc0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000c35000000000000000000000000000000000000000000000000000000000000000010000000000000000000000004918d8c58ddc5fc697ba1ccf3fd8c8faf8a1006c";

const gasEstimator = async () => {
    // ***************************
    // * Gas formula explanation *
    // ***************************
    //
    // Transaction fees (TXFEES) = L2 Gas Price (P) * Gas Limit (G)
    //      ----> Gas Limit (G) = L2 Gas used (L2G) + Extra Buffer for L1 cost (B)
    //      ----> L1 Estimated Cost (L1C) = L1 estimated calldata price per byte (L1P) * L1 Calldata size in bytes (L1S)
    //      ----> Extra Buffer (B) = L1 Cost (L1C) / L2 Gas Price (P)
    //
    // TXFEES = P * (L2G + ((L1P * L1S) / P))

    // ********************************************
    // * How do we get all parts of that equation *
    // ********************************************
    // P (L2 Gas Price) =>
    //      ArbGasInfo.getPricesInWei() and get the sixth element => result[5]
    //      NodeInterface.GasEstimateL1Component() and get the second element => result[1]
    //      NodeInterface.GasEstimateComponents() and get the third element => result[2]
    // L2G (L2 Gas used) => Will depend on the transaction itself
    // L1P (L1 estimated calldata price per byte) =>
    //      (this is the L2's estimated view of the current L1's price per byte of data, which the L2 dynamically adjusts over time)
    //      ArbGasInfo.getL1BaseFeeEstimate() and multiply by 16
    //      ArbGasInfo.getL1GasPriceEstimate() and multiply by 16
    //      ArbGasInfo.getPricesInWei() and get the second element => result[1]
    //      NodeInterface.GasEstimateL1Component() and get the third element and multiply by 16 => result[2]*16
    //      NodeInterface.GasEstimateComponents() and get the fourth element and multiply by 16 => result[3]*16
    // L1S (Size in bytes of the calldata to post on L1) =>
    //      Will depend on the size (in bytes) of the calldata of the transaction
    //      We add a fixed amount of 140 bytes to that amount for the transaction metadata (recipient, nonce, gas price, ...)
    //      Final size will be less after compression, but this calculation gives a good estimation

    // ****************************
    // * Other values you can get *
    // ****************************
    // B =>
    //      NodeInterface.GasEstimateL1Component() and get the first element => result[0]
    //      NodeInterface.GasEstimateComponents() and get the second element => result[1]
    //

    // Add the default local network configuration to the SDK
    // to allow this script to run on a local node
    addDefaultLocalNetwork()

    // Instantiation of the ArbGasInfo and NodeInterface objects
    const arbGasInfo = ArbGasInfo__factory.connect(
        ARB_GAS_INFO,
        baseL2Provider
    );
    const nodeInterface = NodeInterface__factory.connect(
        NODE_INTERFACE_ADDRESS,
        baseL2Provider
    );

    // Getting the gas prices from ArbGasInfo.getPricesInWei()
    const gasComponents = await arbGasInfo.callStatic.getPricesInWei();

    // And the estimations from NodeInterface.GasEstimateComponents()
    const gasEstimateComponents = await nodeInterface.callStatic.gasEstimateComponents(
        GENERIC_NON_ZERO_ADDRESS,
        false,
        txData
    );
    const l2GasUsed = gasEstimateComponents.gasEstimate.sub(gasEstimateComponents.gasEstimateForL1);

    // Setting the variables of the formula
    const P = gasComponents[5];
    const L2G = l2GasUsed;
    const L1P = gasComponents[1];
    const L1S = 140 + utils.hexDataLength(txData);

    // Getting the result of the formula
    // ---------------------------------

    // L1C (L1 Cost) = L1P * L1S
    const L1C = L1P.mul(L1S);

    // B (Extra Buffer) = L1C / P
    const B = L1C.div(P);

    // G (Gas Limit) = L2G + B
    const G = L2G.add(B);

    // TXFEES (Transaction fees) = P * G
    const TXFEES = P.mul(G);

  // VRF variables and calculations
  // ---------------------------------
  // Estimating Costs doc: https://docs.chain.link/vrf/v2/estimating-costs
  // VRF contracts: https://github.com/smartcontractkit/chainlink/tree/develop/contracts/src/v0.8/vrf
  // ---------------------------------
  // Estimated upper bound of verification gas for VRF subscription.
  // To see an estimate with an average amount of verification gas,
  // adjust this to 115000.
  const maxVerificationGas = 200000;


  // The L1 Calldata size includes:
  // Arbitrum's static 140 bytes for transaction metadata
  // VRF V2's static 580 bytes, the size of a fulfillment's calldata ABI-encoded in bytes 
  // (from s_fulfillmentTxSizeBytes in VRFV2Wrapper.sol)
  const VRFCallDataSizeBytes = 140 + 580;

  // For direct funding only. Coordinator gas is verification gas
  const wrapperGasOverhead = 40000;
  const coordinatorGasOverhead = 90000;

  // VRF user settings
  const callbackGasLimit = 175000;

  // Estimate VRF L1 buffer
  const VRFL1CostEstimate = L1P.mul(VRFCallDataSizeBytes);
  const VRFL1Buffer = VRFL1CostEstimate.div(P);

  // VRF Subscription gas estimate
  // L2 gas price (P) * (maxVerificationGas + callbackGasLimit + VRFL1Buffer)
  const VRFL2SubscriptionGasSubtotal = BigNumber.from(maxVerificationGas + callbackGasLimit);
  const VRFSubscriptionGasTotal = VRFL2SubscriptionGasSubtotal.add(VRFL1Buffer);
  const VRFSubscriptionGasEstimate = P.mul(VRFSubscriptionGasTotal);

  // VRF Direct funding gas estimate
  // L2 gas price (P) * (coordinatorGasOverhead + callbackGasLimit + wrapperGasOverhead + VRFL1Buffer)
  const VRFL2DirectFundingGasSubtotal = BigNumber.from(coordinatorGasOverhead + wrapperGasOverhead + callbackGasLimit);
  const VRFDirectFundingGasTotal = VRFL2DirectFundingGasSubtotal.add(VRFL1Buffer);
  const VRFDirectFundingGasEstimate = P.mul(VRFDirectFundingGasTotal);


  console.log("Transaction summary - Arbitrum only");
  console.log("-------------------");
  console.log(`P (L2 Gas Price) = ${utils.formatUnits(P, "gwei")} gwei`);
  console.log(`L2G (L2 Gas used) = ${L2G.toNumber()} units`);
  console.log(`L1P (L1 estimated calldata price per byte) = ${utils.formatUnits(L1P, "gwei")} gwei`);
  console.log(`L1S (L1 Calldata size in bytes) = ${L1S} bytes`);
  console.log("-------------------");
  console.log(`Transaction estimated fees to pay = ${utils.formatEther(TXFEES)} ETH`);

  console.log("Transaction summary - VRF requests on Arbitrum");
  console.log("-------------------");
  console.log(`P (L2 Gas Price) = ${utils.formatUnits(P, "gwei")} gwei`);
  console.log(`VRFL2SubscriptionGasSubtotal (coordinatorGasOverhead + wrapperGasOverhead + callbackGasLimit) = ${VRFL2SubscriptionGasSubtotal.toNumber()} units`);
  console.log(`VRFL2DirectFundingGasSubtotal (maxVerificationGas + callbackGasLimit) = ${VRFL2DirectFundingGasSubtotal.toNumber()} units`);
  console.log(`VRFL1Buffer = ${VRFL1Buffer}`);
  console.log(`L1P (raw value) = ${L1P}`);
  console.log(`L1P (L1 estimated calldata price per byte) = ${utils.formatUnits(L1P, "gwei")} gwei`);
  console.log(`VRFCallDataSizeBytes (L1 Calldata size in bytes) = ${VRFCallDataSizeBytes} bytes`);
  console.log("-------------------");
  console.log(`VRF Subscription transaction estimated fees to pay = ${utils.formatEther(VRFSubscriptionGasEstimate)} ETH`);
  console.log(`VRF Direct funding transaction estimated fees to pay = ${utils.formatEther(VRFDirectFundingGasEstimate)} ETH`);
}

gasEstimator()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    });