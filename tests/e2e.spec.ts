import { test, expect } from '@playwright/test';
import { format } from 'date-fns';

test('User can add a migraine entry', async ({ page }) => {
    await page.goto('/');

    // Should see the header
    await expect(page.getByText('MigraCheck')).toBeVisible();

    // Find today's date cell
    const today = new Date();
    const dateStr = format(today, 'yyyy-MM-dd');

    // Click on today's cell. We need to make sure the cell has the data-testid
    // In DayCell.tsx I added `data-testid={'day-cell-' + date}`
    const cell = page.getByTestId(`day-cell-${dateStr}`);
    await cell.click();

    // Modal should open
    await expect(page.getByText(`Log for ${dateStr}`)).toBeVisible();

    // Select intensity 5
    await page.getByRole('button', { name: '5' }).click();

    // Type notes
    await page.fill('#notes', 'Feeling a bit dizzy');

    // Save
    await page.getByRole('button', { name: 'Save Entry' }).click();

    // Modal should close
    await expect(page.getByText(`Log for ${dateStr}`)).not.toBeVisible();

    // Cell should verify the entry
    await expect(cell).toContainText('Lvl 5');
});
