package org.example.classes;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;

public class Validator {




    public static boolean validateX(BigDecimal x) throws OutOfRangeException{
        return (x.compareTo(new BigDecimal("-3")) >= 0 &&
                x.compareTo(new BigDecimal("5")) <= 0);
    }

    public static boolean validateY(BigDecimal y) {
        return (y.compareTo(new BigDecimal("-3")) >= 0 &&
                y.compareTo(new BigDecimal("3")) <= 0);
    }

    public static boolean validateR(BigDecimal r) {
        return (r.compareTo(new BigDecimal("2")) >= 0 &&
                r.compareTo(new BigDecimal("5")) <= 0);
    }

    public static boolean validateGraphY(BigDecimal y) {
        return (y.compareTo(new BigDecimal("-6")) >= 0 &&
                y.compareTo(new BigDecimal("6")) <= 0);
    }

    public static boolean validateGraphX(BigDecimal x) {
        return (x.compareTo(new BigDecimal("-6")) >= 0 &&
                x.compareTo(new BigDecimal("6")) <= 0);
    }
}
