import { Injectable } from '@nestjs/common';
import { EmbeddingModel, InferenceModel, LoadModelOptions, createCompletion, createEmbedding, loadModel } from 'gpt4all';

@Injectable()
export class AppService {
  getHello(): string {
    return 'NestJs says: Hello World.';
  }

  async getAiReply(): Promise<string> {
    const _aiInferenceModelName = `Meta-Llama-3-8B-Instruct.Q4_0.gguf` // `orca-mini-3b-gguf2-q4_0.gguf`; // `mistral-7b-openorca.gguf2.Q4_0.gguf`, // 'orca-mini-3b-gguf2-q4_0.gguf'
    const _aiEmbeddingModelName = `nomic-embed-text-v1.f16.gguf`; // `all-MiniLM-L6-v2-f16.gguf`;
    const _aiModelPath = `app-data/ai-models`;
    let _inferenceModel: InferenceModel;
    const _inferenceModelOptions: LoadModelOptions = {
      verbose: true, // logs loaded model configuration
      // device: 'gpu', // defaults to 'cpu'
      // nCtx: 2048, // the maximum sessions context window size.

      modelPath: _aiModelPath,
      modelConfigFile: `${_aiModelPath}/models3.json`,
      allowDownload: false,
    };
    // let _embeddingModel: EmbeddingModel;
    // const _embeddingModelOptions: LoadModelOptions = {
    //   verbose: true, 
    //   type: 'embedding',

    //   modelPath: _aiModelPath,
    //   modelConfigFile: `${_aiModelPath}/models3.json`,
    //   allowDownload: false,
    // };
    let _aiContent: string = null;

    try {
      _inferenceModel = await loadModel(
        _aiInferenceModelName,
        _inferenceModelOptions,
      );

      // _embeddingModel = await loadModel(
      //   _aiEmbeddingModelName,
      //   { 
      //     verbose: true, 
      //     type: 'embedding',

      //     modelPath: _aiModelPath,
      //     modelConfigFile: `${_aiModelPath}/models3.json`,
      //     allowDownload: false,
      //   },
      // );
  
      const testPrompt = `What is 1 + 1?`;
      const testPrompt1 = `What is the life expectancy in Vietnam?`;
      const testPrompt2 = `
Isn’t it odd that, when something’s funny, you might show your teeth, change your breathing, become weak and achy in some places, and maybe even cry? In other words, why do we do this bizarre thing that is laughter? When you laugh, your abdominal muscles contract rapidly. This alters your breathing patterns, increasing the pressure in your chest cavity, and pushing air out, which might audibly emerge as a snort, wheeze, or vocalization. Because you’re exerting your abdominal muscles much more than you usually would while talking, they may start to hurt. Laughter also inhibits your reflexes and muscle control, causing sensations like leg weakness. So, where does this funny phenomenon come from? Because there’s no archaeological record of laughter, it’s impossible to say exactly how and why it evolved, but scientists have some theories. Importantly, humans are not the only animals today that do something like laughter. Using ultrasonic recorders, researchers in the late 90s realized that rats were basically giggling while being tickled. Scientists have since compiled evidence of at least 65 species—mostly mammals, but also some birds—that vocalize during social play. Some, unsurprisingly, are our closest relatives. By recording and analyzing the sounds primates make while playing and being tickled, researchers grew more convinced that the ancient ancestor of all great apes did something like laughter. And, because other apes make laughter-like sounds during rough-and-tumble play, they think laughter may have originally developed to clearly signal friendly, non-aggressive intent. But of course, humans don’t just laugh when we’re wrestling, but also when we’re amused, and even surprised, confused, or nervous. Some scientists think laughter took on expanded functions after humans split from other great apes and developed large social groups and more complex language abilities. They hypothesize that laughter gradually became something we could use not just during play but within speech to convey subtle meanings and a range of contexts to show our emotions. This is thought to be one of the reasons that laughter is contagious: it’s like an invitation to share in someone’s emotional state. Just hearing clips of laughter can activate key regions in your brain, triggering you to smile or laugh yourself. And, when participants in one study watched a funny video, they laughed significantly longer and more often when another person was present—even though they reported feeling the same level of amusement. Human laughter is also generally louder than the play vocalizations of most animals. Some scientists speculate that this is because our laughter functions not only as a signal between individuals but a broadcast to everyone around. Studies found that observers across the world and as young as 5 months old could reliably tell the difference between close friends and acquaintances just from brief clips of them laughing. Similarly, we can tell whether a laugh is real or fake based just on the sound. Fake, or volitional, laughter is produced in entirely different networks in the brain, relying on speech-like pathways. Meanwhile, spontaneous laughter arises from older networks that other animals also use for their vocalizations. And laughter is not just socially important; it’s also thought to be good for us. When we laugh, our brains release feel-good neurotransmitters like endorphins and decrease levels of stress hormones like cortisol. Some research even suggests that people who laugh more can cope with stress more effectively and have better cardiovascular health. Laughter is a universal human behavior. Babies can laugh before they can speak. Whether it's the best medicine depends on your ailment. But as something that makes life more tolerable, strengthens bonds, and potentially improves aspects of your health, you can’t go wrong with a good laugh. Unless you have a broken rib or something. Then it’s no laughing matter. Certainly nothing to crack up about.
  
You are an English teacher and required your English learners to watch a video whose content is above. Now, based on the video's content, you want to compose some content for your learners to learn English effectively. Respond to the following:
- Generate a summary with following content:
  - Generate a short description. The answer should be no more than 50 words.
  - Generate the key points (maximum 5 points in an order list).
  - Select some single-word academic vocabularies (must be unique, no more than 5 vocabularies), including a word type, phonetic pronunciation, short definition, example (relate to the video's topic), and its synonym (if there's any). Highlight 1 unique vocabulary in each example using ***.
- Generate a short quiz with following content:
  - For summary exercise, create a question to ask the English learner to select the summary that best matches the content. Provide some choices but only one is correct. And explain shortly why it's the best summary.
  - For vocabulary exercise, for each unique vocabulary above, create another example (relate to the video's topic). Also, in its example, using *** to highlight only one unique single-word academic vocabulary, not other vocabularies. Put each example into a list.
- Response in the JSON format given below:

{
  "summary": {
    "shortDescription": "",
    "keyPoints": [""],
    "newVocabularies": [
      {
        "word": "",
        "pronunciation": "",
        "type": "", 
        "definition": "", 
        "example": "", 
        "synonym": ""
      }
    ]
  },
  "shortQuizContent": {
    "summaryExercise": {
      "question": "", 
      "choices": [""], 
      "correctChoiceIndex": 0, 
      "explanation": ""
    },
    "vocabularyExercise": {
      "exampleList": [""]
    }
  }
}
      `;
  
      // create a completion using a string as input
      const aiResponse = await createCompletion(
        _inferenceModel, 
        testPrompt1,
        { verbose: true },
      );
      console.debug(aiResponse.choices[0].message);

      // const embeddingResult = _embeddingModel.embed('Who is Laurens van der Maaten?', 'search_query', null, null, null); // createEmbedding(_embeddingModel, "Maybe Minecraft was the friends we made along the way");
      // console.log(embeddingResult);
  
      _aiContent = aiResponse.choices[0].message.content;
    } catch (error) {
      console.error(`Exception. error is: ${error.message}`);
    } finally {
      _inferenceModel?.dispose();
      // _embeddingModel?.dispose();

      return _aiContent;
    }
  }
}
