import {
  Storyboard,
  StoryboardCreationStep,
  ChapterResource,
  ChapterModel,
  ChapterCollection,
  OutcomeResource,
  ClueResource,
  ClueCollection,
  OutcomeCollection,
} from '../../interfaces';
import {
  SAVED_CHAPTER,
  CHAPTER_LIST_LOAD,
  CHAPTER_DETAIL_LOAD,
  LOADING,
  CHAPTER_UPDATE,
  // CHAPTER_UPDATE
} from '../actions';

const initialState: Storyboard = {
  chapters: [],
  chaptersById: {},
  clues: [],
  cluesById: {},
  outcomes: [],
  outcomesById: [],
  loading: false,
  steps: [
    { title: 'Setting', description: 'Setting and Cast', active: true },
    { title: 'Points of Interest', description: 'Skill Checks', active: false },
    { title: 'NPC Details', description: 'Add dialogue', active: false }
  ],
  currentStep: StoryboardCreationStep.Setting
};

type NormalizePayloadFn = {
  split: <R>(payload: R[], key: string, f: <T>(ids: number[], records: T) => void) => StoryboardState;
};


// parsePayload<OutcomeCollection, >(state, payload)

type StoryboardState = {
  chaptersById?: ChapterCollection;
  chapters?: number[];
  cluesById?: ClueCollection;
  clues?: number[];
  outcomesById?: OutcomeCollection;
  outcomes?: number[];
}

type ResourceObjectList = ChapterResource | ClueResource | OutcomeResource;
type ResourceModelList = ChapterCollection | ClueCollection | OutcomeCollection;
type SplitCb = (ids: number[], objects: ResourceModelList) => void;
type SplitFn = (key: string, fn: SplitCb) => NormalizeFn;
type NormalizeFn = {
  split: SplitFn;
};

function NormalizePayload(payload: ResourceObjectList[]): NormalizeFn {
  return {
    split: (key: string, fn: SplitCb) => {
      if (key === 'chapters') {
        let clueResources: ClueResource[] = [];
        let chapterObjects: ChapterCollection = {};
        payload.forEach((chapter: ChapterResource) => {
          clueResources = clueResources.concat(chapter.clues);
          let clues: number[] = chapter.clues.map(c => c.id);
          chapterObjects[chapter.id] = Object.assign({}, chapter, { clues });
        });
        let chapterIDs = payload.map((chapter: ChapterResource) => chapter.id);
        fn(chapterIDs, chapterObjects);
        return NormalizePayload(clueResources);
      } else if (key === 'clues') {
        let outcomeResources: OutcomeResource[] = [];
        let clueObjects: ClueCollection = {};
        payload.forEach((clue: ClueResource) => {
          outcomeResources = outcomeResources.concat(clue.outcomes);
          let outcomes = clue.outcomes.map((outcome: OutcomeResource) => outcome.id);
          clueObjects[clue.id] = Object.assign({}, clue, { outcomes });
        });
        let clues = payload.map((clue: ClueResource) => clue.id);
        fn(clues, clueObjects);
        return NormalizePayload(outcomeResources);
      } else {
        let outcomeIDs = payload.map((outcome: OutcomeResource) => outcome.id);
        let outcomeObjects: OutcomeCollection = {};
        payload.forEach((outcome: OutcomeResource) => {
          outcomeObjects = Object.assign({}, outcomeObjects, { [outcome.id]: outcome });
        });
        fn(outcomeIDs, outcomeObjects);
        return NormalizePayload(payload);
      }
    }
  };
}

/*
  .split('chapters', (chapters, chaptersById) => {
    chapters = chapters.concat(chapters);
    chaptersById = Object.assign({}, chaptersById, ...chaptersById);
  }).split('clues', (clues, cluesById) => {

  });
*/

function ClueList<E>(ids: number[], objects: E): NormalizePayloadFn {
  return {
    split: (payload: ResourceObjectList[], key: string, f: <T>(ids: number[], data: T) => void) => {
      if (key === 'chapters') {
        let payloadClues: ClueResource[] = [];
        let chapterids = payload
          .map((chapter: ChapterResource) => chapter.id)
          .filter((id: number) => ids.indexOf(id) === -1)
          .concat(ids);
        let chapters: ChapterCollection = payload
          .reduce((prev: ChapterCollection, next: ChapterResource) => {
            payloadClues = payloadClues.concat(next.clues);
            let extractedClues: number[] = next.clues.map((clue: ClueResource) => clue.id);
            let chapter: ChapterModel = Object.assign({}, next, {
              clues: extractedClues
            });
            prev[next.id] = chapter;
            return prev;
          }, {});
          return { chaptersById: chapters, chapters: chapterids };
        // ids = ids.filter(n => n !)
      }
      return ClueList(ids, objects);
    }
  };
}
/*

*/


// type ClueAction = { clue: ClueResource, chapterID: number };
// function chapterUpdate(state: Storyboard, clue: ClueAction): Storyboard {
//   const { chaptersById, chapters } = state;
//   const chapter = chaptersById[clue.chapterID];
//   chapter.outcomes
//   return Object.assign({}, state, {
//     chaptersById: Object.assign({}, chaptersById, { [clue.chapterID]:  })
//   });
// }
// util function. maybe if I use it, I should move it somewhere else?

function savedChapter(state: Storyboard, chapter: ChapterResource): Storyboard {
  const chaptersById = state.chaptersById;
  return Object.assign({}, state, {
    chapters: [...state.chapters, chapter.id],
    chaptersById: Object.assign({}, chaptersById, { [chapter.id]: chapter }),
    loading: false,
    currentStep: StoryboardCreationStep.PointsOfInterest
  });
}

function loadingState(state: Storyboard): Storyboard {
  return Object.assign({}, state, { loading: true });
}

function chapterListLoad(state: Storyboard, payload: ChapterResource[]): Storyboard {
  let { clues, cluesById, chapters, chaptersById, outcomes, outcomesById } = state;
  // let clueData = ClueList<ResourceObjectList>(chapters, chaptersById);
  NormalizePayload(payload)
    .split('chapters', (ids: number[], objects: ChapterCollection) => {
      chapters = ids.filter(id => chapters.indexOf(id) < 0).concat(chapters);
      chaptersById = Object.assign({}, chaptersById, objects);
    }).split('clues', (ids: number[], objects: ClueCollection) => {
      clues = ids.filter(id => clues.indexOf(id) < 0).concat(clues);
      cluesById = Object.assign({}, cluesById, objects);
    }).split('outcomes', (ids: number[], objects: OutcomeCollection) => {
      outcomes = ids.filter(id => outcomes.indexOf(id) < 0).concat(outcomes);
      outcomesById = Object.assign({}, outcomesById, objects);
    });

  return Object.assign({}, state, {
    chapters, chaptersById, clues, cluesById, outcomes, outcomesById
  });
}

function chapterDetailLoad(state: Storyboard, chapter: ChapterResource): Storyboard {
  let { chaptersById, chapters, clues, cluesById, outcomes, outcomesById } = state;
  NormalizePayload([chapter])
    .split('chapters', (ids: number[], objects: ChapterCollection) => {
      chapters = ids.filter(id => chapters.indexOf(id) < 0).concat(chapters);
      chaptersById = Object.assign({}, chaptersById, objects);
    }).split('clues', (ids: number[], objects: ClueCollection) => {
      clues = ids.filter(id => clues.indexOf(id) < 0).concat(clues);
      cluesById = Object.assign({}, cluesById, objects);
    }).split('outcomes', (ids: number[], objects: OutcomeCollection) => {
      outcomes = ids.filter(id => outcomes.indexOf(id) < 0).concat(outcomes);
      outcomesById = Object.assign({}, outcomesById, objects);
    });

  return Object.assign({}, state, {
    chapters, chaptersById, clues, cluesById, outcomes, outcomesById
  });
}

// FIXME

function chapterUpdate(state: Storyboard, action: any): Storyboard {
  let { cluesById, clues, chaptersById } = state;
  const { clue } = action;

  let chapter = chaptersById[clue.chapter];
  // DON'T DO THIS, but let's just do it anyway...
  chapter.clues.push(clue);
  return Object.assign({}, state, {
    cluesById: Object.assign({}, cluesById, { [clue.id]: clue }),
    clues: [...clues, clue.id],
    chaptersById: Object.assign({}, chaptersById, { [chapter.id]: chapter })
  });
}

export default function storyboard(state: Storyboard, action: any) {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case SAVED_CHAPTER: return savedChapter(state, action.chapter);
    case CHAPTER_LIST_LOAD: return chapterListLoad(state, action.chapters);
    case CHAPTER_DETAIL_LOAD: return chapterDetailLoad(state, action.chapter);
    case CHAPTER_UPDATE: return chapterUpdate(state, action);
    case LOADING: return loadingState(state);
    default: return initialState;
  }
}
