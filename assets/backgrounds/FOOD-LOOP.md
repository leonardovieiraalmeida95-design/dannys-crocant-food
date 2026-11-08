# Loop ilustrativo de frango e barbecue

Cena criada para esta proposta com quatro imagens da ferramenta integrada de geração de imagens: um fundo com barbecue, dois recortes de frango crocante e um respingo de molho. São imagens ilustrativas, não fotos de produtos reais da Danny’s. Os prompts exatos estão em food-layers/PROMPTS.json.

As camadas são animadas localmente por scripts/render-food-loop.py e codificadas com FFmpeg. O vídeo não depende de serviço externo, não contém áudio e usa MP4/H.264 com início rápido. O ciclo dura 12 segundos, com quatro quedas espaçadas, imersão, respingos suaves e ondulação periódica do molho. O primeiro e o fim matemático do ciclo são comparados durante a renderização para verificar continuidade.

- chicken-barbecue-loop.mp4: versão de fundo para computadores, 1280×854, 30 fps.
- chicken-barbecue-loop-mobile.mp4: versão mais leve para celular, 720×480, 24 fps.
- barbecue-poster-wide.webp e barbecue-poster-mobile.webp: imagem estática para carregamento, movimento reduzido e indisponibilidade de reprodução.
- food-layers/: imagens de origem otimizadas e prompts da geração integrada.

O site carrega o vídeo somente quando a hero está próxima da área visível, respeita movimento reduzido e economia de dados indicada pelo navegador, pausa fora da tela ou em outra aba e oferece um botão para pausar/retomar. O bloqueio de reprodução automática pelo navegador mantém o fundo estático. A opção de pausar não reinicia o clipe.

Para refazer os clipes, é preciso Pillow, numpy e imageio-ffmpeg no ambiente de preparação. Esses recursos não fazem parte do código executado pelos visitantes. O script também aceita quatro caminhos de imagens de origem para preparar as camadas.
