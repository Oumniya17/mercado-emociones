/* ===================================
   GET EMOTIONS
=================================== */

async function getEmotions() {

  return await apiGet(
    "/emotions"
  );
}

/* ===================================
   GET EMOTION
=================================== */

async function getEmotionById(
  id
) {

  return await apiGet(
    `/emotions/${id}`
  );
}

/* ===================================
   CREATE EMOTION
=================================== */

async function createEmotion(
  emotionData
) {

  return await apiPost(
    "/emotions",
    emotionData
  );
}

/* ===================================
   UPDATE EMOTION
=================================== */

async function updateEmotion(
  id,
  emotionData
) {

  return await apiPut(
    `/emotions/${id}`,
    emotionData
  );
}

/* ===================================
   DELETE EMOTION
=================================== */

async function deleteEmotion(
  id
) {

  return await apiDelete(
    `/emotions/${id}`
  );
}