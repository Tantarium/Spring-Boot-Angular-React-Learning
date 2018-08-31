package lp3.show_program;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class JudgeService {

    private static List<Judge> judges = new ArrayList<>();

    static {
        Judge judge1 = new Judge(12345, "Terry", "Nomar", 786543);
        Judge judge2 = new Judge(87641, "Jaws", "McBitey", 849303);
    }
}
