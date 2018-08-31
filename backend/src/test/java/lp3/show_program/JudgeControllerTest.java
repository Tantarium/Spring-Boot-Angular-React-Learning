package lp3.show_program;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class JudgeControllerTest {

    @Autowired
    private MockMvc mvc;

    //todo --- issue here is that this will run before every test, which I don't want...
    //todo --- but, if I make it a BeforeClass, it needs to be static and then I can't call the MockMvc...
    @Before
    public void createJudges() throws Exception {
        String judge1 = "{\"firstName\": \"Jaws\",\"lastName\": \"McBitey\",\"number\": \"1155437\"}";
        String judge2 = "{\"firstName\": \"Rick\",\"lastName\": \"Sanchez\",\"number\": \"7778465\"}";
        String judge3 = "{\"firstName\": \"Master\",\"lastName\": \"Chief\",\"number\": \"8412586\"}";
        String judge4 = "{\"firstName\": \"Peter\",\"lastName\": \"Griffon\",\"number\": \"9112534\"}";
        String judge5 = "{\"firstName\": \"Icy\",\"lastName\": \"Bones\",\"number\": \"7712543\"}";
        this.mvc.perform(post("/judges")
                .contentType(MediaType.APPLICATION_JSON)
                .content(judge1));
        this.mvc.perform(post("/judges")
                .contentType(MediaType.APPLICATION_JSON)
                .content(judge2));
        this.mvc.perform(post("/judges")
                .contentType(MediaType.APPLICATION_JSON)
                .content(judge3));
        this.mvc.perform(post("/judges")
                .contentType(MediaType.APPLICATION_JSON)
                .content(judge4));
        this.mvc.perform(post("/judges")
                .contentType(MediaType.APPLICATION_JSON)
                .content(judge5));
    }

    @Test
    public void creatingAJudgeSuccessfullyInsertsJudgeTest() throws Exception {
        String judgeToAdd = "\"firstName\": \"Ash\",\"lastName\": \"Ketchum\",\"number\": \"1125454\"";
        String judgeAdded = "\"firstName\":\"Ash\",\"lastName\":\"Ketchum\",\"number\":1125454";

        //todo --- Figure out how to test if something is NOT there

        this.mvc.perform(post("/judges")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{" + judgeToAdd + "}"));

        this.mvc.perform(get("/judges")).andExpect(status().isOk())
                .andExpect(content().string(org.hamcrest.Matchers.containsString(judgeAdded)));
    }

//    todo --- Gotta figure out the way to test if something isn't there for the final part of this test
//    @Test
//    public void creatingThenDeletingTest() throws Exception {
//        String jsonAfterCreate = "{\"id\":1,\"firstName\":\"Jaws\",\"lastName\":\"McBitey\",\"number\":1155437}";
//
//        this.mvc.perform(get("/judges")).andExpect(status().isOk())
//                .andExpect(content().string("[" + jsonAfterCreate + "]"));
//
//        this.mvc.perform(delete("/judges/1")).andExpect(status().isOk());
//
//        this.mvc.perform(get("/judges")).andExpect(status().isOk())
//                .andExpect(content().string(jsonAfterDelete));
//
//    }

    @Test
    public void updatingEntryTest() throws Exception {
        String judgeToEdit = "\"id\":5,\"firstName\":\"Icy\",\"lastName\":\"Bones\",\"number\":7712543";
        String editParameters = "\"firstName\":\"Thok\",\"lastName\":\"of Runescape\",\"number\":\"7712543\"";
        String judgeAfterEdit = "\"id\":5,\"firstName\":\"Thok\",\"lastName\":\"of Runescape\",\"number\":7712543";

        this.mvc.perform(get("/judges")).andExpect(status().isOk())
                .andExpect(content().string(org.hamcrest.Matchers.containsString(judgeToEdit)));

        this.mvc.perform(put("/judges/5")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{" + editParameters + "}"));

        this.mvc.perform(get("/judges")).andExpect(status().isOk())
                .andExpect(content().string(org.hamcrest.Matchers.containsString(judgeAfterEdit)));
    }

    @Test
    public void getSingleJudgeTest() throws Exception {
        String judgeToGet = "{\"id\":4,\"firstName\":\"Peter\",\"lastName\":\"Griffon\",\"number\":9112534}";

        this.mvc.perform(get("/judges/4")).andExpect(status().isOk())
                .andExpect(content().string(judgeToGet));
    }

}
