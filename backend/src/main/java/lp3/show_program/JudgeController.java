package lp3.show_program;

import java.net.URI;
import java.util.ArrayList;
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
    @CrossOrigin(origins = "*")
    public List<Judge> retrieveAllJudges() {
        return judgeRepository.findAll();
    }

    @GetMapping("/judges/{id}")
    @CrossOrigin(origins = "*")
    public Judge retrieveJudge(@PathVariable long id) throws JudgeNotFoundException {
        Optional<Judge> judge = judgeRepository.findById(id);

        if (!judge.isPresent()) throw new JudgeNotFoundException("id - " + id);

        return judge.get();
    }

    @GetMapping("/judges/search")
    @CrossOrigin(origins = "*")
    public List<Judge> judgeSearch(String searchTerm) {
        List<Judge> judges = new ArrayList<>();
        List<Judge> allJudges = judgeRepository.findAll();

        for (Judge j : allJudges) {
            if (j.getFirstName().toLowerCase().contains(searchTerm.toLowerCase())) {
                judges.add(j);
            } else if (j.getLastName().toLowerCase().contains(searchTerm.toLowerCase())) {
                judges.add(j);
            } else if (Integer.toString(j.getNumber()).contains(searchTerm)) {
                judges.add(j);
            }
        }

        return judges;
    }

    @DeleteMapping("/judges/{id}")
    @CrossOrigin(origins = "*")
    public void deleteJudge(@PathVariable long id) {
        judgeRepository.deleteById(id);
    }

    @PostMapping("/judges")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Object> createJudge(@RequestBody Judge judge) {
        Judge savedJudge = judgeRepository.save(judge);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedJudge.getId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @PutMapping("/judges/{id}")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Object> updateJudge(@RequestBody Judge judge, @PathVariable long id) {
        Optional<Judge> judgeOptional = judgeRepository.findById(id);

        if (!judgeOptional.isPresent()) return ResponseEntity.notFound().build();

        judge.setId(id);

        judgeRepository.save(judge);

        return ResponseEntity.noContent().build();
    }
}
