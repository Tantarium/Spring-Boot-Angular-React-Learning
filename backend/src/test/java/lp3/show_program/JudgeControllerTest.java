package lp3.show_program;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.jupiter.api.BeforeAll;
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

    private String judge1 = "{\"firstName\": \"Jaws\",\"lastName\": \"McBitey\",\"number\": \"1155437\"}";
    private String judge2 = "{\"firstName\": \"Rick\",\"lastName\": \"Sanchez\",\"number\": \"7778465\"}";
    private String judge3 = "{\"firstName\": \"Master\",\"lastName\": \"Chief\",\"number\": \"8412586\"}";
    private String judge4 = "{\"firstName\": \"Peter\",\"lastName\": \"Griffon\",\"number\": \"9112534\"}";
    private String judge5 = "{\"firstName\": \"Icy\",\"lastName\": \"Bones\",\"number\": \"7712543\"}";

    @Before
    public void createJudges() throws Exception {
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

        this.mvc.perform(post("/judges")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{" + judgeToAdd + "}"));

        this.mvc.perform(get("/judges")).andExpect(status().isOk())
                .andExpect(content().string(org.hamcrest.Matchers.containsString(judgeAdded)));
    }

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

}
