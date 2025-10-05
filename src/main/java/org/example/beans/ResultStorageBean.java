package org.example.beans;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Named("resultStorage")
@ApplicationScoped
public class ResultStorageBean implements Serializable {
    private List<CalculationResult> results = new CopyOnWriteArrayList<>();
    private int maxResults = 100; // максимальное количество хранимых результатов

    public void addResult(CalculationResult result) {
        results.add(0, result); // добавляем в начало

        // Ограничиваем размер списка
        if (results.size() > maxResults) {
            results = new CopyOnWriteArrayList<>(results.subList(0, maxResults));
        }
    }

    public List<CalculationResult> getResults() {
        return new ArrayList<>(results);
    }

    public void clearResults() {
        results.clear();
    }

    public int getResultCount() {
        return results.size();
    }
}