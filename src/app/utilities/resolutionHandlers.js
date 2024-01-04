import { supabase } from "../supabaseClient"; // Adjust the path as necessary

export async function handleAddResolution(
  resolutionText,
  idNum,
  user,
  setResolutions
) {
  try {
    const { error } = await supabase.from("resolutions").insert([
      {
        id: idNum,
        user_id: user.id,
        message: resolutionText,
        name: user.user_metadata.full_name,
      },
    ]);

    if (error) {
      console.error("Error adding resolution:", error);
    } else {
      const newResolution = {
        id: idNum,
        user_id: user.id,
        message: resolutionText,
        name: user.user_metadata.full_name,
      };
      setResolutions((prevResolutions) => [...prevResolutions, newResolution]);
    }
  } catch (error) {
    console.error("Error adding resolution:", error.message);
  }
}

export async function handleDeleteResolution(
  resolutionToDelete,
  setResolutions
) {
  if (!resolutionToDelete.id) {
    console.error("Invalid resolution ID.");
    return;
  }

  try {
    const { error } = await supabase
      .from("resolutions")
      .delete()
      .eq("id", resolutionToDelete.id);

    if (error) {
      console.error("Error deleting resolution:", error);
    } else {
      setResolutions((prevResolutions) =>
        prevResolutions.filter(
          (resolution) => resolution.id !== resolutionToDelete.id
        )
      );
    }
  } catch (error) {
    console.error("Error deleting resolution:", error.message);
  }
}

export async function updateResolutionInDb(updatedResolution, setResolutions) {
  try {
    const { error } = await supabase
      .from("resolutions")
      .update({
        message: updatedResolution.message,
      })
      .match({ id: updatedResolution.id });

    if (error) throw error;

    setResolutions((prevResolutions) =>
      prevResolutions.map((resolution) =>
        resolution.id === updatedResolution.id ? updatedResolution : resolution
      )
    );
  } catch (error) {
    console.error("Error updating resolution:", error.message);
  }
}

export const updateResolution = async (updatedResolution, setResolutions) => {
  await updateResolutionInDb(updatedResolution, setResolutions);
};
