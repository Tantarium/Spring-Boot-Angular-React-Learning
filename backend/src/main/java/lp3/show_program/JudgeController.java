package lp3.show_program;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class JudgeController {


    @Autowired
    private JudgeRepository judgeRepository;

    @GetMapping("/judges")
    public List<Judge> retrieveAllJudges() {    //Judge judge(@RequestParam(value="firstName", defaultValue="Terry") String firstName) {
        return judgeRepository.findAll(); //return new Judge(counter.incrementAndGet(), String.format(template, firstName));
    }

    @GetMapping("/judges/{id}")
    public Judge retrieveJudge(@PathVariable long id) throws JudgeNotFoundException {
        Optional<Judge> judge = judgeRepository.findById(id);

        if (!judge.isPresent()) throw new JudgeNotFoundException("id - " + id);

        return judge.get();
    }

    @DeleteMapping("/judges/{id}")
    public void deleteJudge(@PathVariable long id) {
        judgeRepository.deleteById(id);
    }

    @PostMapping("/judges")
    public ResponseEntity<Object> createJudge(@RequestBody Judge judge) {
        Judge savedJudge = judgeRepository.save(judge);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedJudge.getId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @PutMapping("/judges/{id}")
    public ResponseEntity<Object> updateJudge(@RequestBody Judge judge, @PathVariable long id) {
        Optional<Judge> judgeOptional = judgeRepository.findById(id);

        if (!judgeOptional.isPresent()) return ResponseEntity.notFound().build();

        judge.setId(id);

        judgeRepository.save(judge);

        return ResponseEntity.noContent().build();
    }
}
